//to create a dto we need to install package npm install class-validator class-transformer

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'JD' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'JohnDoe@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @MinLength(6, {
    message: 'validation.password.length',
  })
  password: string;
}
