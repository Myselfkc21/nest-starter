import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[UsersModule,JwtModule], // Import UsersService to use it in AuthService
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Export AuthService to use it in other modules if needed
})
export class AuthModule {}
