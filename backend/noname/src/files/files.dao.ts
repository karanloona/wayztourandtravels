import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { CreateFolderDTO, UpdateFolderDTO, contactDTO } from "./files.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Files } from "./files.schema";
import { ObjectId } from "mongodb";
import { AssumeRoleCommand, STSClient } from "@aws-sdk/client-sts";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Contact } from "./contact.schema";
import { ConfigService } from "@nestjs/config";



@Injectable()
export class FilesDao {
    private accessKeyId: string;
    private secretAccessKey: string;
    private role: string;
    private region: string;
    private bucket: string;

    constructor(
        @InjectModel('Files') private filesModel: Model<Files>,
        @InjectModel('Contact') private contactModel: Model<Contact>,
        private readonly configService: ConfigService
    ) {
        this.accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
        this.secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
        this.role = this.configService.get<string>('AWS_S3_ROLE');
        this.region = this.configService.get<string>('AWS_REGION');
        this.bucket = this.configService.get<string>('AWS_S3_BUCKET');
    }
    async createFolder(dto: CreateFolderDTO) {
        const filter = {
            userId: dto.userId,
            folderName: dto.folderName,
        };
    
        // Check if a document with the same criteria exists
        const existingFolder = await this.filesModel.findOne(filter);
    
        if (existingFolder) {
            return new UnprocessableEntityException(`Folder already exists`);
        } else {
            // Perform the upsert operation
            const update = {
                $setOnInsert: dto,
            };
    
            const options = {
                upsert: true,
            };
    
            const result: any = await this.filesModel.updateOne(filter, update, options);
            return result;
        }
    }
    

    async getFoldersByCompanyId(companyId:ObjectId) {
        return await this.filesModel.find({ userId: companyId })
    }

    async getFilesByFolderIdAndCompanyId(companyId: ObjectId, folderId: ObjectId) {
        const res:any = await this.filesModel.find({ userId: companyId, _id: folderId });
        return {files: res[0].files, folderName: res[0].folderName};
    }

    async uploadFiles(files:any) {
        let result = [];
        for(let i=0; i<files.files.length; i++) {
            const stsClient = new STSClient({
                region: this.region,
                credentials: {
                    accessKeyId: this.accessKeyId,
                    secretAccessKey: this.secretAccessKey,
                },
            });
    
            const command = new AssumeRoleCommand({
                RoleArn: this.role,
                RoleSessionName: `uploadSession`,
                DurationSeconds: 900,
            });
    
            const response = await stsClient.send(command);
            
            const s3 = new S3Client({
                region: this.region,
                credentials: {
                    accessKeyId: response.Credentials.AccessKeyId,
                    secretAccessKey: response.Credentials.SecretAccessKey,
                    sessionToken: response.Credentials.SessionToken,
                },
            });
    
            const uniqueUUID = uuidv4();
            const params = {
                Bucket: this.bucket,
                Key: `${uniqueUUID}/${String(files.files[i].originalname)}`,
                Body: files.files[i].buffer
            };
            try {
                const data = await s3.send(new PutObjectCommand(params));
                result.push(params.Key)
            }
            catch (err) {
                return {
                    isSuccess: false,
                    err
                }
            }
        }
        return result;
    }

    async getFile(fileKey: string) {
        const stsClient = new STSClient({
            region: this.region,
            credentials: {
                accessKeyId: this.accessKeyId,
                secretAccessKey: this.secretAccessKey,
            },
        });
        const command = new AssumeRoleCommand({
            RoleArn: this.role,
            RoleSessionName: `uploadSession`,
            DurationSeconds: 900,
        });
        const response = await stsClient.send(command);
        const expirationTimeInSeconds = 30;
        const s3 = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: response.Credentials.AccessKeyId,
                secretAccessKey: response.Credentials.SecretAccessKey,
                sessionToken: response.Credentials.SessionToken,
            },
        });
        const getObjectCommand = new GetObjectCommand({ Bucket: this.bucket, Key: fileKey });
        const url = getSignedUrl(s3, getObjectCommand, { expiresIn: expirationTimeInSeconds });
        return url;
    }

    async updateFolderFiles(folderId:ObjectId, files:any){
        
        return await this.filesModel.updateOne( { _id: folderId}, { $push: { files: { $each: files } } });
    }

    async deleteFolder(folderId:ObjectId) {
        return await this.filesModel.deleteOne({ _id:folderId });
    }

    async updateFolder(dto: UpdateFolderDTO) {
        const result = await this.filesModel.updateOne(
            {
                _id: new ObjectId(dto.folderId),
                folderName: { $ne: dto.folderName }
            },
            {
                $set: { folderName: dto.folderName }
            }
        )
        if (!result.modifiedCount) {
            return new UnprocessableEntityException(`Same Folder Exits`);
        }
        return result;
    }

    async deleteFileFromFolder(folderId:ObjectId, file:string) {
        return await this.filesModel.updateOne(
            { _id: folderId },
            { $pull: { files: file } }
        );
    }

    async contact(dto: contactDTO) {
        const createContact:Contact = {
            fullName: dto.fullname,
            email: dto.email,
            message: dto.message,
            date: dto.date,
            time: dto.time
        };
        const contact = new this.contactModel(createContact);
        return await contact.save();
    }



    

}