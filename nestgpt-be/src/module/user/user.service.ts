import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOne(username: string) {
    return this.prismaService.user.findFirst({ where: { username } });
  }

  async create(username: string, password: string) {
    return this.prismaService.user.create({
      data: { username, password },
    });
  }
}
