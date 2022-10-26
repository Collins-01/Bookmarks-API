import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import AuthService from './auth.service';
import { ForgotPasswordDTO, LoginDTO, RegisterDTO } from './dto';

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }

  @Post('signup')
  signUp(@Body() dto: RegisterDTO) {
    return this.authService.signUp(dto);
  }
  @Post('forgotPassword')
  async forgotPassword(@Body() dto: ForgotPasswordDTO) {
    console.log(`Email address forgotPassword :: ${dto.email}`);
    return await this.authService.forgotPassword(dto.email);
  }
}
