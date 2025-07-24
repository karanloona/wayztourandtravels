import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";

@Schema({ timestamps: true })
export class Company {
    @Prop({userId: ObjectId, required: true})
    userId: ObjectId;

    @Prop({ type: ObjectId, required: true})
    categoryId: ObjectId;

    @Prop({ type: String, required: true})
    name: string;  
    
    @Prop({ type: String, required: true})
    city: string;  
    
}

export const CompanySchema = SchemaFactory.createForClass(Company);