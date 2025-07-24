import { ApiProperty } from '@nestjs/swagger';
import { UserType } from './users.entity'; // Import the enum

export class LoginDTO {
  @ApiProperty({ example: 'superadmin@gmail.com' })
  username: string;

  @ApiProperty({ example: 'superadmin' })
  password: string;
}

export class CreateUserDTO extends LoginDTO {
  @ApiProperty({ enum: UserType, example: UserType.SUPERADMIN })
  userType: UserType; // Use the enum directly
}

export class CheckUser {
  @ApiProperty()
  companyId: string;

  @ApiProperty()
  userId: string;
}

export class PasswordDTO {
  @ApiProperty({ example: 1 }) // Example updated to a number
  userId: number; // Changed to number to match Users.id

  @ApiProperty({ example: 'superadmin' })
  password: string;
}