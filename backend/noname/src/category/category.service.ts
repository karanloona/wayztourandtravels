import { Injectable } from "@nestjs/common";
import { AddCategoryDTO } from "./category.dto";
import { CategoryDao } from "./category.dao";
import { ObjectId } from "mongodb";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryDao:CategoryDao) {}

    async createCategory(dto:AddCategoryDTO){
        return await this.categoryDao.createCategory(dto)
    }

    async getAllCategories() {
        return await this.categoryDao.getAllCategories();
    }

    async getCategoryDetailById(id:string) {
        return await this.categoryDao.getCategoryDetailById(new ObjectId(id));
    }

    async deleteCategoryById(categoryId:string) {
        return await this.categoryDao.deleteCategoryById(new ObjectId(categoryId));
    }

    async getCategoryCompany() {
        return await this.categoryDao.getCategoryCompany();
    }
}