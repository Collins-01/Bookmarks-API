import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from '../auth/guard';


@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    type userWithoutHash = Omit<User, 'hash'>;
    return user;
  }

  @Patch('edit')
  editUser() {}

  @Get('test')
  testApi(){
    return {
      'msg': 'Test API works properly'
    }
  }
}
