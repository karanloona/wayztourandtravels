import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";

@Schema({ timestamps: true })
export class Contact {
    @Prop({userId: String, required: true})
    fullName: string;

    @Prop({email: String, required: true})
    email: string;

    @Prop({message: String, required: true})
    message: string;

    @Prop({date: String, required: true})
    date: string;

    @Prop({time: String, required: true})
    time: string;

}

export const ContactSchema = SchemaFactory.createForClass(Contact);