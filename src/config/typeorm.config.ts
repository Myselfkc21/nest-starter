import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';// Importing config from the 'config' package


const dbConfig = config.get<{ [key: string]: string }>('typeorm'); // Fetching the TypeORM configuration from the config package
export const typeormConfig: TypeOrmModuleOptions = {
  type: dbConfig.type as any, // Cast to 'any' to avoid type issues
  host: dbConfig.host as any,
  port: dbConfig.port as any,
  username: dbConfig.username as any,
  password: dbConfig.password as any,
  database: dbConfig.database as any,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
