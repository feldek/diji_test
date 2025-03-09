import { DataSource } from 'typeorm';
import { UserEntity } from '../domains/users/entities/user.entity';
import { TransactionEntity } from '../domains/transactions/entities/transaction.entity';
import { join } from 'node:path';

const typeOrmConfig = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 9000,
  username: 'postgres',
  password: 'postgres',
  database: 'diji_test',
  entities: [UserEntity, TransactionEntity],
  synchronize: false,
  logging: false,
  migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
});

export { typeOrmConfig };
