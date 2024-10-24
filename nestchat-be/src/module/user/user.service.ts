import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string) {
    const userData = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!userData) {
      throw new NotFoundException('User not found');
    }

    return { username: userData.username };
  }
  async findOne(username: string) {
    return await this.prismaService.user.findFirst({ where: { username } });
  }

  async create(username: string, password: string) {
    return await this.prismaService.user.create({
      data: { username, password },
    });
  }

  async update(userDto: UpdateUserDto, userId: string) {
    const { username, password } = userDto;
    const updatedUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    if (username && updatedUser.username != username) {
      updatedUser.username = username;
    }

    if (password && bcrypt.compare(updatedUser.password, password)) {
      const salt = await bcrypt.genSalt();
      updatedUser.password = await bcrypt.hash(password, salt);
    }

    return this.prismaService.user.update({
      where: { id: userId },
      data: { username: updatedUser.username, password: updatedUser.password },
    });
  }
}
