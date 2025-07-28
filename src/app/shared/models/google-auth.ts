import { Status } from "../constants/app-enum";

export class GoogleAuth {
    status: Status;
    secretKey: string;
    code: string;
}