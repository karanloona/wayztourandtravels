import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Category {
    @Prop({ type: String, required: true})
    name: string;    
}

export const CategorySchema = SchemaFactory.createForClass(Category);