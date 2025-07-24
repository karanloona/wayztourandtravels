import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";

export class CreateFolderDTO {
    @ApiProperty({ example: '654279b1b83f726f518ee9b4' })
    userId: ObjectId;

    @ApiProperty({ example: 'folder 1' })
    folderName: string;

    @ApiProperty({ example: ['123.pdf', '234.pdf'] , required: false})
    files: Array<string>;
    
}

export class UpdateFolderDTO {
    @ApiProperty({ example: '654279b1b83f726f518ee9b4' })
    folderId: ObjectId;

    @ApiProperty({ example: 'folder 1' })
    folderName: string;
}

export class deleteFileFromFolderDTO {
    @ApiProperty({ example: '654279b1b83f726f518ee9b4' })
    folderId: string;

    @ApiProperty({ example: '13431-4t23-324twge/123.png' })
    fileId: string;
}

export class fileRequestDTO {
    @ApiProperty()
    filename: string;
}

export class sendMailDTO {
    @ApiProperty()
    filename: string;

    @ApiProperty()
    to: string;
}

export class contactDTO {
    @ApiProperty()
    fullname: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    message: string;

    @ApiProperty()
    date: string

    @ApiProperty()
    time: string;
}