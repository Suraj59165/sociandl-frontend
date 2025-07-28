import {Status} from "../../constants/app-enum";
import {Documents} from "../Documents";

export class UserMerchant {
  id: string;
  userId: string;
  tradeName: string;
  tradeAddress: string;
  status: Status;
  documents: Documents;
}
