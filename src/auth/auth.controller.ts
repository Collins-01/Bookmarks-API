import { Body, Controller, ParseIntPipe, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import AuthService from './auth.service';
import { AuthDto } from './dto';

@Controller()
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto:AuthDto) {
    return this.authService.login(dto);
  }
  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    console.log(JSON.stringify(dto));
    return this.authService.signUp(dto);
  }
}
