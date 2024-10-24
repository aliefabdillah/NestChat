import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(userRegisterDto: CreateAuthDto) {
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
}
