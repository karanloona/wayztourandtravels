import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { JwtClassModule } from "../database/jwt.module";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { FilesDao } from "./files.dao";
import { LocalStrategy } from "../strategy/local.strategy";
import { JwtStrategy } from "../strategy/jwt.strategy";
import { MongooseModule } from "@nestjs/mongoose";
import { FilesSchema } from "./files.schema";
import { SesModule } from '@nextnm/nestjs-ses';
import { ContactSchema } from "./contact.schema";

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        SesModule.forRoot({
            secret: process.env.AWS_SES_SECRET,
            apiKey: process.env.AWS_SES_API_KEY,
            region: process.env.AWS_SES_REGION,
        }),
        AuthModule,
        JwtClassModule,
        DatabaseModule,
        MongooseModule.forFeature([{ name: 'Files', schema: FilesSchema }, {name: 'Contact', schema: ContactSchema}]),
    ],
    controllers: [FilesController],
    providers: [FilesService, FilesDao, LocalStrategy, JwtStrategy]
})

export class FilesModule {}