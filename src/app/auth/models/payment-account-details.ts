import {PaymentMethodType} from '../../shared/constants/app-enum';
import {Audit} from '../../shared/models/Audit';

export class PaymentAccountDetails extends Audit {
  id: string;
  holderName: string;
  identifierNumber: number;
  bankCode: string;
  bankName: string;
  bankBranch: string;
  upiId: string;
  // paymentPlatform: PaymentPlatform = new PaymentPlatform();
  paymentMethodType: PaymentMethodType;
  status: string;
  userId: string;
  cashAddress: string;
  defaultFlag: boolean = false;
  cardExpiryDate: Date;
  cvv: number;
}
