export class SpErrorHandler {
  invalid: boolean = false;
  errorFieldData: any = {};

  addError(field: string, error: string) {
    this.invalid = true;
    this.errorFieldData[field] = new SpErrorHandlerData(true, error);
  }

  clearError() {
    this.invalid = false;
    this.errorFieldData = {};
  }

  emptyCheck(value: string | number | undefined | any, parentKey: string, childKey?: string, index?: number): void {
    let isEmpty = false;
    if (value === undefined || value === null) {
      isEmpty = true;
    } else if (typeof value === 'string' && value.trim() === '') {
      isEmpty = true;
    } else if (Array.isArray(value) && value.length === 0) {
      isEmpty = true;
    } else if (value instanceof Date) {
      isEmpty = isNaN(value.getTime());
    } else if (
      typeof value === 'object' &&
      !(value instanceof Date) &&
      Object.keys(value).length === 0
    ) {
      isEmpty = true;
    }

    if (isEmpty) {
      if ((index || index === 0) && childKey) {
        this.addError(parentKey + '[' + index + '].' + childKey, 'Required');
      } else if (parentKey && childKey) {
        this.addError(parentKey + '.' + childKey, 'Required');
      } else {
        this.addError(parentKey, 'Required');
      }
    }
  }

  getErrorHandlerData(parentKey: string, childKey?: string, index?: number): SpErrorHandlerData {
    if ((index || index === 0) && childKey && parentKey) {
      return this.errorFieldData[parentKey + '[' + index + '].' + childKey];
    } else if (parentKey && childKey) {
      return this.errorFieldData[parentKey + '.' + childKey];
    } else if ((index || index === 0) && childKey) {
      return this.errorFieldData['[' + index + '].' + childKey];
    } else {
      return this.errorFieldData[parentKey];
    }
  }
}


export class SpErrorHandlerData {
  invalid: boolean;
  error: string;

  constructor(invalid: boolean, errorMsg: string) {
    this.invalid = invalid;
    this.error = errorMsg;
  }
}
