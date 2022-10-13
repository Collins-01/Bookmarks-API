import { Controller, Post } from '@nestjs/common';
import AuthService from './auth.service';

@Controller()
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login() {
    return this.authService.login();
  }
  @Post('signup')
  signUp() {
    return this.authService.signUp();
  }
}
