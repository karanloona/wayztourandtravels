import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";

@Schema({ timestamps: true })
export class Files {
    @Prop({userId: ObjectId, required: true})
    userId: ObjectId;

    @Prop({ type: String, required: true})
    folderName: string;

    @Prop({types: Array<String>, required:false})
    files: Array<String>;
}

export const FilesSchema = SchemaFactory.createForClass(Files);