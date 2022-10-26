import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
