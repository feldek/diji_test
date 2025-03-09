import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import BigNumber from 'bignumber.js';
import { runWithRetry } from '../../utils/RunWithRetry';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly connection: DataSource,
  ) {}

  findOne(id: string) {
    return this.transactionRepository.findOne({ where: { id: id } });
  }

  async create(params: CreateTransactionDto) {
    return runWithRetry(() => this.createTransaction(params));
  }

  private async createTransaction(params: CreateTransactionDto): Promise<void> {
    const { userId, amount } = params;
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(UserEntity, {
        where: { id: userId },
        lock: { mode: 'pessimistic_partial_write' },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const balance = new BigNumber(user.balance).minus(amount);

      if (balance.lt(0)) {
        throw Error('Not Enough money');
      }

      user.balance = balance.toString();

      await queryRunner.manager.save(user);

      const transaction = new TransactionEntity();

      transaction.amount = amount;

      transaction.userId = userId;

      await queryRunner.manager.save(transaction);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}

export { TransactionsService };
