import {Documents} from "./Documents";
import {Audit} from './Audit';

export class Merchant extends Audit {
  id: string;
  userId: string;
  tradeName: string;
  tradeAddress: string;
  status: string;
  documents: Documents[] = [];
}
