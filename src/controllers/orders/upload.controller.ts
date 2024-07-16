import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../../services/upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<string> {
    console.log('upload/image call');
    
    const imageUrl = await this.uploadService.uploadFile(file, 'image');
    console.log('uploadService called for storing image locally');
    
    return imageUrl.url; // Return just the imageUrl string
  }

  @Post('audio')
  @UseInterceptors(FileInterceptor('audio'))
  async uploadAudio(@UploadedFile() file: Express.Multer.File): Promise<string> {
    console.log('upload/audio call');
    
    const audioUrl = await this.uploadService.uploadFile(file, 'audio');
    console.log('uploadService called for storing audio locally');
    
    return audioUrl.url; // Return just the audioUrl string
  }
}
