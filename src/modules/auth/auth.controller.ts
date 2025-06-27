import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user-login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: UserLoginDto })
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.authService.login(userLoginDto);
  }
@Post('upload')
  @ApiConsumes('multipart/form-data') // 👈 Required for Swagger UI to show file input
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // 👈 This is what triggers the file picker
        },
      },
    },
  })
@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
}))

  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    // Implement your file upload logic here
    // For example, you can save the file to a specific directory or cloud storage
    // and return the file path or URL.
    return `File ${file.originalname} uploaded successfully`;
  }
}
