import {Status} from '../constants/app-enum';

export class SearchRequest {
  pageSize: number = 10;
  pageNumber: number = 1;
  id: string;
  type: string;
  status: Status;
}

export class RequestSearch extends SearchRequest {
  assignedToId: string;
}

export class PaymentSearchRequest extends SearchRequest {
  userId: string;
}
