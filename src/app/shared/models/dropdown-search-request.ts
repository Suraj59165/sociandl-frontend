export class DropdownSearchRequest {
  public uuid: string;
  public autoCompleteType: string | undefined;
  public searchFor: any;
  public accountId: string | undefined;
  public userId: string | undefined;
  public name: string;
  public balance: string;
  pageNumber: number;
  pageSize: number;
}
