import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidNumberString } from '../../../services/validata/StringIsFloat';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsValidNumberString()
  amount: string;
}
