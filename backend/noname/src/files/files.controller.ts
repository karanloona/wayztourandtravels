import { Body, Controller, Delete, Get, Param, Post, Req, UnauthorizedException, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateFolderDTO, UpdateFolderDTO, contactDTO, deleteFileFromFolderDTO, fileRequestDTO, sendMailDTO } from "./files.dto";
import { FilesService } from "./files.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { API_BEARER_AUTH_NAME, JwtAuthGaurd } from "../gaurds/jwt-auth.gaurd";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { Request } from 'express';

@ApiTags('files')
@ApiBearerAuth(API_BEARER_AUTH_NAME)
@Controller('files')
export class FilesController {
  constructor(
      private readonly filesService:FilesService
  ) {}

  @UseGuards(JwtAuthGaurd)
  @Post('add/folder')
  async createFolder(@Req() req: Request, @Body() dto: CreateFolderDTO) {
    if(req['user'].userType === 'member'){
        throw new UnauthorizedException();
    }
    return await this.filesService.createFolder(dto);
  }

  @UseGuards(JwtAuthGaurd)
  @Get('getFoldersByCompanyId/:id')
  async getFoldersByCompanyId(@Param('id') id:string) {
      return await this.filesService.getFoldersByCompanyId(id);
  }

  @UseGuards(JwtAuthGaurd)
  @Post('upload/:folderId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        folderId: {
          type: 'string',
          description: 'folderId',
        },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'files', maxCount: 10 }, // Adjust 'maxCount' as needed
  ]))
  async uploadFiles(@UploadedFiles() files: { files: Express.Multer.File[] }, @Param('folderId') folderId: any, @Req() req: Request) {
    if(req['user'].userType === 'member'){
      throw new UnauthorizedException();
    }
    
    
    return await this.filesService.uploadFiles(files,folderId); 
  }

  @UseGuards(JwtAuthGaurd)
  @Post('getFileInfo')
  async getFile(@Body() dto:fileRequestDTO) {
    return await this.filesService.getFile(dto.filename);
  }

  @UseGuards(JwtAuthGaurd)
  @Get('getFilesFromFolder/:companyId/:folderId')
  async getFilesByFolderIdAndCompanyId(@Param('companyId') companyId:string, @Param('folderId') folderId:string) {
    return await this.filesService.getFilesByFolderIdAndCompanyId(companyId, folderId);
  }



  @UseGuards(JwtAuthGaurd)
  @Delete('deleteFolder/:id')
  async deleteFolder(@Param('id') id:string, @Req() req: Request) {
    if(req['user'].userType === 'member'){
      throw new UnauthorizedException();
    }
    return await this.filesService.deleteFolder(id);
  }

  @UseGuards(JwtAuthGaurd)
  @Post('update/folderDetails')
  async updateFolder(@Body() dto:UpdateFolderDTO, @Req() req: Request) {
    if(req['user'].userType === 'member'){
      throw new UnauthorizedException();
    }
    return await this.filesService.updateFolder(dto);
  }



  @UseGuards(JwtAuthGaurd)
  @Post('deleteFile/')
  async deleteFileFromFolder(@Body() dto:deleteFileFromFolderDTO, @Req() req: Request){
    if(req['user'].userType !== 'superadmin'){
      throw new UnauthorizedException();
    }
    
    return await this.filesService.deleteFileFromFolder(dto.folderId, dto.fileId);
  }

  @UseGuards(JwtAuthGaurd)
  @Post('send-email')
  async sendEmail(@Body() dto: sendMailDTO) {
    return await this.filesService.sendEmail(dto);
  }

  @Post('contact')
  async contact(@Body() dto: contactDTO) {
    return await this.filesService.contact(dto);
  }
}