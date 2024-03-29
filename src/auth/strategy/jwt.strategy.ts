import { Delete, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: { sub: number; email: string }) {
    console.log({ payload });
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    // TODO: Implement `Delete The has before sending to the user.`
    // delete user?.hash;
    // const {hash, ...rest} = user;

    return user;
  }
}
