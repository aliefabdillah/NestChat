import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

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
}
