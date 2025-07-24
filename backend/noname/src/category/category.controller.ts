import { Body, Controller, Delete, Get, Param, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AddCategoryDTO } from "./category.dto";
import { API_BEARER_AUTH_NAME, JwtAuthGaurd } from "../gaurds/jwt-auth.gaurd";
import { CategoryService } from "./category.service";
import { Request } from 'express';

@ApiTags('category')
@Controller('category')
@UseGuards(JwtAuthGaurd)
@ApiBearerAuth(API_BEARER_AUTH_NAME)
export class CategoryController {
    constructor(private readonly categoryService:CategoryService) {}
    
    @Post('add')
    async addCategory(@Body() dto:AddCategoryDTO, @Req() req: Request){
        if(req['user'].userType !== 'superadmin'){
            throw new UnauthorizedException();
        }
        return this.categoryService.createCategory(dto);
    }
    
    @Get('all')
    async getAllCategories(@Req() req: Request) {
        if(req['user'].userType === 'member'){
            throw new UnauthorizedException();
        }
        return await this.categoryService.getAllCategories();
    }

    @Get('/detail/:id')
    async getCategoryDetailById(@Param('id') id:string, @Req() req: Request) {
        if(req['user'].userType === 'member'){
            throw new UnauthorizedException();
        }
        return await this.categoryService.getCategoryDetailById(id);
    }

    @Delete(':id')
    async deleteCategoryById(@Param('id') id:string, @Req() req: Request) {
        if(req['user'].userType === 'member'){
            throw new UnauthorizedException();
        }

        return await this.categoryService.deleteCategoryById(id);
    }

    @Get('getCategoryCompany')
    async getCategoryCompany(@Req() req: Request) {
        if(req['user'].userType === 'member'){
            throw new UnauthorizedException();
        }

        return await this.categoryService.getCategoryCompany();
    }
}