import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "./category.schema";
import { JwtStrategy } from "../strategy/jwt.strategy";
import { LocalStrategy } from "../strategy/local.strategy";
import { DatabaseModule } from "../database/database.module";
import { JwtClassModule } from "../database/jwt.module";
import { AuthModule } from "../auth/auth.module";
import { CategoryDao } from "./category.dao";

@Module({
    imports: [
        AuthModule,
        JwtClassModule,
        DatabaseModule,
        MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryDao, LocalStrategy, JwtStrategy]
})

export class CategoryModule {}