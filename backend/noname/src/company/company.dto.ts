import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";

export class CreateCompanyDTO {
    userId: ObjectId;
    
    @ApiProperty({ example: '654279b1b83f726f518ee9b4' })
    categoryId: ObjectId;

    @ApiProperty({ example: 'kfc' })
    name: string;

    @ApiProperty({ example: 'kfc@gmail.com' })
    email: string;

    @ApiProperty({ example: 'test1234' })
    password: string;

    @ApiProperty({ example: 'toronto' })
    city: string;
}


export class UpdateCompanyDTO {
    @ApiProperty({ example: '654279b1b83f726f518ee9b4', required: false })
    categoryId: ObjectId;

    @ApiProperty({ example: 'kfc', required: false })
    name: string;

    @ApiProperty({ example: 'toronto', required: false })
    city: string;
}

export class DeleteCompanyDTO {
    @ApiProperty({ example: '654279b1b83f726f518ee9b4' })
    userId: string;
}