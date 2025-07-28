import { SearchRequest } from "../search-request";

export class UserSearchRequest extends SearchRequest {
  verificationStatus: string;
  userId: string;
  code: string;
}
