import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  async createChat(@Body() createChatDto: CreateChatDto) {
    return await this.chatService.createChat(createChatDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getChats(@Req() req) {
    return await this.chatService.fetchChats(req.user.id);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getChatDetail(@Param('id') id: string) {
    return await this.chatService.fetchChatDetail(id);
  }
}
