import { Audit } from "../Audit";
import { TransactionBase } from '../transaction-base';
import { Documents } from '../Documents';
import { UserMerchant } from "./userMerchant";

export class Request extends Audit {
  id: string;
  userId: string;
  assignedToId: string;
  name: string;
  email: string;
  requestType: string;
  requestNumber: string;
  reason: string;
  status: string;
  sourceCurrencyId: string;
  targetCurrencyId: string;
  accountId: string;
  targetAccountId: string;
  sourceAccountId: string;
  sourceCurrencyCode: string;
  targetCurrencyCode: string;
  transactionBase: TransactionBase = new TransactionBase();
  documents: Documents[] = [];
  accountNo: number;
  fees: number;
  totalAmount: number;
  paymentAddress: string
  userMerchant: UserMerchant = new UserMerchant();
  cancelledBy: string;
  cancelledAt: Date;
  approvedBy: string;
  approvedAt: Date;
  code: string;
}

