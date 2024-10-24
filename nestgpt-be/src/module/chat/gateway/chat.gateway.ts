import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { MessageDto } from '../dto/message.dto';

@WebSocketGateway(3001, { cors: true })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private readonly chatService: ChatService) {}

  private readonly logger = new Logger();
  @WebSocketServer() server: Server;

  afterInit() {
    this.logger.log('Gateway initialized');
  }

  handleConnection(client: Socket) {
    const connectedClients = this.server.engine.clientsCount;
    this.logger.log(`Number of User Connected ${connectedClients}`);
    this.logger.log(`User Connected with ID: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`User Disconnected ${client.id}`);
    const connectedClients = this.server.engine.clientsCount;
    this.logger.log(`Number of User Connected ${connectedClients}`);
  }

  @SubscribeMessage('send-message')
  async sendMessageEvent(
    @MessageBody()
    payload: {
      chatId: string;
      content: string;
      senderId: string;
    },
  ) {
    const message: MessageDto = { content: payload.content };
    const chat = await this.chatService.sendMessage(
      payload.chatId,
      payload.senderId,
      message,
    );

    if (!chat) {
      throw new WsException('Could not send message');
    }

    this.server.to(payload.chatId).emit('receive-message', chat);
  }

  @SubscribeMessage('join-chat')
  async joinChatEvent(
    @ConnectedSocket() client: any,
    @MessageBody('id') chatId: string,
  ) {
    client.join(chatId);
    this.logger.log(`User ${client.id} Joined the chat ${chatId}`);
  }
}
