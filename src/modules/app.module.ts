import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../config/typeorm.config';
import { UsersModule } from './users/users.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';

//to add i18n we npm install --save nestjs-i18n
@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UsersModule,
    // I18nModule.forRoot({
    //   fallbackLanguage: 'en',
    //   loaderOptions: {
    //     path: path.join(__dirname, '/i18n/'),
    //     watch: true,
    //   },
    //   resolvers: [
    //     { use: QueryResolver, options: ['lang'] },
    //     AcceptLanguageResolver,
    //   ],
    // }),
    // ]
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
