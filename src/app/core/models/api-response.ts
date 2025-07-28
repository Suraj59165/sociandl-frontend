export interface ApiResponse {
  status: number;
  message: string;
  customMessage: string;
  path: string;
  code: string;
  data: any;
}

export interface ApiValidationError {
  status: number;
  code: string;
  message: string;
  totalErrorCount: number;
  fieldErrors: ApiFieldValidError[];
}

export interface ApiFieldValidError {
  message: string;
  fieldName: string;
}
