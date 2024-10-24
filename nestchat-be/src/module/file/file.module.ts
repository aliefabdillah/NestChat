import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ChatService } from '../chat/chat.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [FileController],
  providers: [FileService, ChatService, PrismaService],
})
export class FileModule {}
