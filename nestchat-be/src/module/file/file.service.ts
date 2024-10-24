import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { PrismaService } from 'prisma/prisma.service';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(private prismaService: PrismaService) {}

  async uploadFile(chatId: string, file: Express.Multer.File) {
    const chat = await this.prismaService.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat) {
      throw new NotFoundException('Chat Not Found');
    }

    const newFile = await this.prismaService.file.create({
      data: {
        filename: file.filename,
        mimetype: file.mimetype,
        path: file.path,
        chat: {
          connect: {
            id: chatId,
          },
        },
      },
    });

    return newFile;
  }

  async downloadFile(fileId: string) {
    const file = await this.prismaService.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      throw new NotFoundException('File Not Found');
    }

    return file;
  }

  getFilePath(file: File): string {
    // return file path from uploads folder
    return join(process.cwd(), 'src', '..', file.path);
  }
}
