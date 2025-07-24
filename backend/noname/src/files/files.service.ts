import { Injectable } from "@nestjs/common";
import { CreateFolderDTO, UpdateFolderDTO, contactDTO, sendMailDTO } from "./files.dto";
import { FilesDao } from "./files.dao";
import { ObjectId } from "mongodb";
import * as nodemailer from 'nodemailer';
import { SesService } from '@nextnm/nestjs-ses';
import { SesEmailOptions } from '@nextnm/nestjs-ses'


@Injectable()
export class FilesService {
    
    constructor(
        private readonly filesDao: FilesDao,
        private sesService: SesService
    ) {}
    async createFolder(dto:CreateFolderDTO) {
        dto['userId'] = new ObjectId(dto.userId);
        return await this.filesDao.createFolder(dto);
    }

    async getFoldersByCompanyId(companyId:string){
        return await this.filesDao.getFoldersByCompanyId(new ObjectId(companyId));
    }

    async getFilesByFolderIdAndCompanyId(companyId:string, folderId:string) {
        return await this.filesDao.getFilesByFolderIdAndCompanyId(new ObjectId(companyId), new ObjectId(folderId));
    }

    async uploadFiles(files:any, folderId:any) {
        const res = await this.filesDao.uploadFiles(files);
        
        return await this.filesDao.updateFolderFiles(new ObjectId(folderId), res);
    }

    async getFile(fileKey: string) {
        return await this.filesDao.getFile(fileKey);
    }

    async deleteFolder(id:string) {
        return await this.filesDao.deleteFolder(new ObjectId(id));
    }

    async updateFolder(dto:UpdateFolderDTO) {
        return await this.filesDao.updateFolder(dto);
    }

    async deleteFileFromFolder(folderId:string, file:string) {
        return await this.filesDao.deleteFileFromFolder(new ObjectId(folderId), file);
    }

    async sendEmail(dto:sendMailDTO) {
        const to = dto.to;
        const subject = 'Please Find this attachment';
        const res = await this.filesDao.getFile(dto.filename);
        const from = 'info@sbsaccounting.ca'
        const options: SesEmailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: `Thanks for choosing SBS Accounting. <br /><br /> Please Find the the attachment below. <br /><br /><a href='${res}' target="_blank">Download Now</a>`
        }
        return await this.sesService.sendEmail(options);
    }


    async contact(dto: contactDTO) {
        return await this.filesDao.contact(dto);
    }

}