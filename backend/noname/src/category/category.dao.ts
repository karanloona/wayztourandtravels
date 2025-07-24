import { Injectable } from "@nestjs/common";
import { AddCategoryDTO } from "./category.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./category.schema";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";

@Injectable()

export class CategoryDao {
    constructor(@InjectModel('Category') private categoryModel: Model<Category>) {}
    
    async createCategory(dto:AddCategoryDTO) {
        const category = new this.categoryModel({name: dto.name});
        return await category.save();
    }

    async getAllCategories() {
        return await this.categoryModel.find();
    }

    async getCategoryDetailById(categoryId:ObjectId) {
        return await this.categoryModel.find({ _id: categoryId });
    }

    async deleteCategoryById(categoryId:ObjectId) {
        return await this.categoryModel.deleteOne({ _id: categoryId });
    }

    async getCategoryCompany() {
        return await this.categoryModel.aggregate([
            {
                $lookup: {
                  from: 'companies',
                  localField: '_id',
                  foreignField: 'categoryId',
                  as: 'companies',
                },
            },
            {
                $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                    "companies.createdAt": 0,
                    "companies.updatedAt": 0,
                    "companies.__v": 0,
                    "companies.categoryId": 0,
                    "companies.userId": 0,
                }
            }
        ]).exec();
    }
}