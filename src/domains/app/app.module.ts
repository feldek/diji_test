import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 9000,
      username: 'postgres',
      password: 'postgres',
      database: 'diji_test',
      entities: [User],
      synchronize: true, // Автоматическое создание таблиц (только для разработки)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
