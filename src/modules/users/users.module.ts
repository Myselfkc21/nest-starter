import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { typeormConfig } from 'src/config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entity/user.entity';

//2. here we import the user entity so that we can get access of it in the module.
//technically so that we can inject this repository into the service to get access to DB operations
//then we just open the services file of the module
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService], // Export UsersService to use it in other modules like AuthModule
  //in the auth module we will import the users module to use the users service
  //so that we can use the users service in the auth service
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
