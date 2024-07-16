import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UploadService {
  constructor(private readonly httpService: HttpService) {}

  async uploadFile(fileOrUrl: Express.Multer.File | string, type: 'image' | 'audio'): Promise<{ url: string }> {
    try {
      // Ensure upload directory exists based on file type
      const uploadPath = path.join(__dirname, '..', 'upload', type === 'image' ? 'images' : 'audio');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      let url: string;
      let fileName: string;

      if (typeof fileOrUrl === 'string' && (fileOrUrl.startsWith('http://') || fileOrUrl.startsWith('https://'))) {
        // Handle URL
        const response = await axios.get(fileOrUrl, { responseType: 'arraybuffer' });
        const fileBuffer = Buffer.from(response.data);

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = this.getFileExtensionFromUrl(fileOrUrl);
        fileName = uniqueSuffix + fileExtension;
        const filePath = path.join(uploadPath, fileName);

        await fs.promises.writeFile(filePath, fileBuffer);

        url = `/upload/${type === 'image' ? 'images' : 'audio'}/${fileName}`;
      } else if (typeof fileOrUrl === 'string') {
        // Handle local file path
        const localFilePath = fileOrUrl;
        const fileBuffer = fs.readFileSync(localFilePath);

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(localFilePath);
        fileName = uniqueSuffix + fileExtension;
        const filePath = path.join(uploadPath, fileName);

        await fs.promises.writeFile(filePath, fileBuffer);

        url = `/upload/${type === 'image' ? 'images' : 'audio'}/${fileName}`;
      } else {
        // Handle file upload (assuming it's a Multer file object)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(fileOrUrl.originalname);
        fileName = uniqueSuffix + fileExtension;
        const filePath = path.join(uploadPath, fileName);

        await fs.promises.writeFile(filePath, fileOrUrl.buffer);

        url = `/upload/${type === 'image' ? 'images' : 'audio'}/${fileName}`;
      }

      console.log(`Stored ${type} with filename:`, fileName); // Log the stored file name for debugging

      return { url };
    } catch (error) {
      // Log the error for debugging purposes
      console.error(`Error uploading ${type}:`, error);
      throw new Error(`Error uploading ${type}`);
    }
  }

  private getFileExtensionFromUrl(url: string): string {
    const pathName = new URL(url).pathname;
    return path.extname(pathName);
  }
}
