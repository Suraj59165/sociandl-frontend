import {SearchRequest} from '../search-request';

export class TransactionSearchRequest extends SearchRequest {
  accountId: string;
  fromDate: Date;
  toDate: Date;
}
