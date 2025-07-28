import {Audit} from './Audit';

export class CountryCurrency extends Audit {
  id: string;
  countryName: string;
  currencyCode: string;
  currencySymbol: string;
  currencyName: string;
  status: string;
  selected?: boolean;
  disabled?: boolean;
  // paymentPlatforms: PaymentPlatform[] = [];
}
