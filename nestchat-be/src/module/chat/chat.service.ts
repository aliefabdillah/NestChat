import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessageDto } from './dto/message.dto';

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

  async fetchChatDetail(chatId: string) {
    return this.prismaService.chat.findUnique({
      where: { id: chatId },
      include: {
        participants: {
          select: {
            username: true,
          },
        },
        messages: {
          select: {
            sender: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
  }

  async sendMessage(chatId: string, senderId: string, messageDto: MessageDto) {
    const chat = await this.prismaService.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const message = await this.prismaService.chat.update({
      where: { id: chatId },
      data: {
        messages: {
          create: [
            {
              sender: { connect: { id: senderId } },
              content: messageDto.content,
              timestamp: new Date(),
            },
          ],
        },
      },
      include: {
        messages: {
          select: {
            content: true,
            timestamp: true,
            sender: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    if (!message) {
      throw new UnprocessableEntityException();
    }

    return message;
  }
}
