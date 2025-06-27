import { Injectable, UnauthorizedException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { use } from 'i18next';
import { instanceToPlain } from 'class-transformer';
import * as config from 'config';
import { ConfigObject } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';

const JwtConfig = config.get<ConfigObject>('jwt');

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  // The UsersService is injected to handle user-related operations
  // such as finding or creating users.
  //we need to import the jwtModule in the auth.module.ts file
  async login(userLoginDto: UserLoginDto) {
    const user = await this.userService.find(userLoginDto.username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      userLoginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = await this.tokenGenerate(instanceToPlain(user));
    const data = { token: token, user: instanceToPlain(user) };
    return data;
  }

  async tokenGenerate(data: any): Promise<string> {
    let token = await this.jwtService.sign(
      { ...data },
      { secret: JwtConfig.secret },
    ); // Replace 'secretKey' with your actual secret key
    return token;
  }

}
