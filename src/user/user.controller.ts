import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from '../auth/guard';


@Controller('users')
@ApiTags('User')
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
