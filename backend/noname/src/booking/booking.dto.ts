import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmpty,
  IsOptional
} from '@nestjs/class-validator';

export class CreateBookingDTO {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsEmpty()
  uuid?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  contact: number;

  @ApiProperty()
  numberOfTravelers: number;

  @ApiProperty({required: false})
  @IsOptional()
  infants: number;

  @ApiProperty()
  date: string; // ISO date string (e.g., "2025-03-22")
  
  @ApiProperty()
  tripProtection: boolean;

  @ApiProperty()
  totalCost: number;
}

export class CreateBookingInquiryDTO {
  @ApiProperty({required: false})
  @IsOptional()
  name?: string;

  @ApiProperty()
  email: string;

  @ApiProperty({required: false})
  @IsOptional()
  message?: string;
}


export class RefundUuid {
  @ApiProperty({required: true})
  uuid: string;
}