import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import AuthService from './auth.service';
import { AuthDto } from './dto';

@Controller()
export default class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: AuthDto) {
    console.log(JSON.stringify(dto));
    return this.authService.login(dto);
  }

  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    console.log(JSON.stringify(dto));
    return this.authService.signUp(dto);
  }
}
