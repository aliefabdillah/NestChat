import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(private prismaService: PrismaService) {}

  async createChat(createChatDto: CreateChatDto) {
    return this.prismaService.chat.create({
      data: {
        participants: {
          connect: createChatDto.participants.map((id) => ({ id: id })),
        },
        messages: {
          create: [],
        },
      },
      select: {
        id: true,
        participants: {
          select: {
            id: true,
            username: true,
          },
        },
        messages: true,
      },
    });
  }

  async fetchChats(userId: string) {
    return this.prismaService.chat.findMany({
      where: {
        participants: {
          some: { id: userId },
        },
      },
      include: {
        participants: {
          select: { username: true },
        },
      },
    });
  }
}
