import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/module/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // validate id on user database
  async validate(payload: any) {
    // payload get from jwt sign when login
    const { username } = payload;
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Login first to acesss this endpoint');
    }

    return user;
  }
}
