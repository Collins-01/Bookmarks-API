import { Injectable } from '@nestjs/common';

@Injectable()
export default class AuthService {
  login() {
    return {
        msg: 'Login Successful'
    };
  }
  signUp() {
    return 'I am SignUp';
  }
}
