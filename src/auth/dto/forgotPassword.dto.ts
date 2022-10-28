import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
