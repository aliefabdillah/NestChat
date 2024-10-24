import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOne(username: string) {
    return this.prismaService.user.findFirstOrThrow({ where: { username } });
  }
}
