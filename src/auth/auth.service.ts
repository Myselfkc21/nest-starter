import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { loginDto } from './dto/login.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtservice: JwtService,
  ) {}

  async generateToken(payload: { id: number; username: string }) {
    return this.jwtservice.sign(payload);
  }

  async login(body: loginDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: body.username,
      },
    });
    if (user?.username != body.username || user?.password != body.password) {
      return 'invalid username or password';
    }
    // const check = bcrypt.compare(body.password, user.password);
    // if (!check) {
    //   return 'invalid username or password';
    // }
    const token = await this.generateToken({
      id: user.id,
      username: user.username,
    });

    const data = {
      data: user,
      token: token,
    };
    return data;
  }
}
