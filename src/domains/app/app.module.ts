import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from '../transactions/transactions.module';
import { typeOrmConfig } from '../../database/typeorm.config';

@Module({
  imports: [
    UsersModule,
    TransactionsModule,
    TypeOrmModule.forRoot(typeOrmConfig.options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
