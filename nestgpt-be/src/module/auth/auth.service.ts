import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (user && bcrypt.compare(user.password, password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(userRegisterDto: RegisterDto) {
    const { username, password } = userRegisterDto;

    const existingUser = await this.userService.findOne(username);
    if (existingUser) {
      throw new BadRequestException('User already registered');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.userService.create(username, hashedPassword);
    if (!newUser) {
      throw new UnprocessableEntityException();
    }
    return newUser;
  }

  async login(userLoginDto: LoginDto) {
    const { username, password } = userLoginDto;

    // check user in database by username and password
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new BadRequestException('Invalid username or Password');
    }

    // create jwt token
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
