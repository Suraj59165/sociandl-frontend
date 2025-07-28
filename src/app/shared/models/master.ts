import {MasterType} from "../constants/app-enum";
import {Audit} from "./Audit";
import {ValueJson} from "./value-json";

export class Master extends Audit {
  id: number;
  name: string;
  code: string;
  type: MasterType;
  enabled: boolean;
  valueJson: ValueJson = new ValueJson();
}
