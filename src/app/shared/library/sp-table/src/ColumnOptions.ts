export class ColumnOptions {
  header: string;
  columnData?: any;
  type: ColumnOptionType;
  actionOptions?: ActionOptionType[];
}

export declare class ListEvent {
  pageNumber: number;
  pageLimit: number;
}

export declare class ActionEvent {
  actionType: ActionOptionType | undefined;
  rowData: any | undefined;
}

export type ColumnOptionType =
  'CHECK'
  | 'SR_NO'
  | 'NUMBER'
  | 'TEXT'
  | 'DATE'
  | 'ACTION'
  | 'ACTIVITY'
  | 'MULTILINE'
  | 'ACTION_PRO';

export type ActionOptionType =
  'REFRESH'
  | 'EDIT'
  | 'CANCEL'
  | 'VIEW'
  | 'DELETE'
  | 'DASHBOARD'
  | 'ADD'
  | 'DOWNLOAD'
  | 'EXTERNAL'
  | 'OPENMODALWITHTEXT'
  | 'SAVE_CHECK'
  | 'CHAT';
