import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export default class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  // * LOGIN
  async login(dto: AuthDto) {
    // Find User
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new NotFoundException('No user found.');
    }
    // Check password
    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Incorrect Credentials.');
    }
    const token = await this.signToken(user.id, user.email);
    const partialUser: Partial<User> = {
      ...user,
    };
    delete partialUser['hash'];
    return {
      ...token,
      ...partialUser,
    };
  }
  // * REGISTER
  async signUp(dto: AuthDto) {
    // Generate Hash
    //  Save user
    // Return User
    try {
      const hash = await argon.hash(dto.password);
      console.log(`Hashed Password : ${hash}`);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
        select: {
          id: true,
          email: true,
          // hash: true,
        },
      });
      const token = await this.signToken(user.id, user.email);
      return {
        token,
        ...user,
      };
    } catch (error) {
      console.log(`Error Creating User: ${error}`);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`A user with ${dto.email} already exists.`);
      }
      throw new Error(error);
    }
  }

  // * CREATES A TOKEN AFTER A USER LOGS IN THE APPLICATION
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email: email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
