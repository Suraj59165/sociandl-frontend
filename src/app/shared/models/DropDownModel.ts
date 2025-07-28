export class DropDownModel {
  label: string;
  code: any | undefined;
  version: any | undefined;
  paymentPlatformId: any | undefined;
  id: number | string | undefined | any;
  // uid?: number | undefined;
  value: number | undefined;
  deptMappingFlag?: boolean | undefined;
  disabled?: boolean;

  constructor(label: string, id: number | undefined | string) {
    this.label = label;
    this.id = id;
  }
}
