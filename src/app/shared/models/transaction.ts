import {TransactionBase} from "./transaction-base";
import {Audit} from './Audit';

export class Transaction extends Audit {
  id: string;
  transactionType: string;
  transactionStatus: string;
  currencyCode: string;
  fees: number;
  totalAmount: number;
  transactionBase: TransactionBase;
  sourceAccountName: string;
  targetAccountName: string;
  sourceCurrencyCode: string;
  targetCurrencyCode: string;
  transactionDescription: string;
  parentType: string;
  sourceAccountNo: number;
  targetAccountNo: number;
}
