import { PartialType } from '@nestjs/mapped-types';
import { loginDto } from './login.dto';
import { IsEmail, IsString } from 'class-validator';

export class signupDto extends PartialType(loginDto) {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
