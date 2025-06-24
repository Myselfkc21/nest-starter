import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

//3. here we inject the user repository and simply use it in the service
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async find(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async create(data: CreateUserDto): Promise<User | null> {
    const user = this.userRepository.create({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
    });
    return await this.userRepository.save(user);
  }
}
