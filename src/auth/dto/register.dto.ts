import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;
}
