import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('/chat/:chatId/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.env.UPLOAD_FOLDER,
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @Param('chatId') chatId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.uploadFile(chatId, file);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':fileId')
  async downloadFile(@Param('fileId') fileId: string, @Res() res: Response) {
    const file = await this.fileService.downloadFile(fileId);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    res.sendFile(this.fileService.getFilePath(file));
  }
}
