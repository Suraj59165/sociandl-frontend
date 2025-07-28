import {Audit} from '../../shared/models/Audit';
import {CountryCurrency} from '../../shared/models/CountryCurrency';

export class Balance extends Audit {
  public id: string;
  public balance: number;
  public frozenBalance: number;
  public countryCurrency: CountryCurrency = new CountryCurrency();
  public accountId: string;
}
