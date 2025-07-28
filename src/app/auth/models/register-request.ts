import {Documents} from "../../shared/models/Documents";

export class RegisterRequest {
  name: string;
  email: string;
  password: string;
  countryName: string;
  phoneNumber: number;
  otp: string;
  documents: Documents[] = [];
}
