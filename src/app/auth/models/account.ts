import {Audit} from '../../shared/models/Audit';
import {Balance} from './balance';

export class Account extends Audit {
  public id: string;
  public accountNo: number;
  public type: string;
  public status: string;
  public balanceList: Balance[] = [];
  public accountName: string;
}
