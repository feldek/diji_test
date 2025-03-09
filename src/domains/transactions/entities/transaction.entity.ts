import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('transactions')
class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: string;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: string;
}

export { TransactionEntity };
