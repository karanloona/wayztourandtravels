import { ApiProperty } from "@nestjs/swagger";

export class AddCategoryDTO {
    @ApiProperty({example: "example 1"})
    name: string;
}