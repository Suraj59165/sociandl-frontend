import { SpErrorHandler } from '../models/sp-error-handler';
import { CoreConst } from '../../core/constants/core-const';
import { Injectable } from '@angular/core';
import { GoogleAuth } from '../models/google-auth';
import { AppName } from '../constants/app-enum';

@Injectable({
  providedIn: 'root'
})

export class AppUtilService {
  private static readonly EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  private static readonly PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_])[A-Za-z\d@_]{8,}$/;

  constructor() { }

  // @ts-ignore
  static validateByPattern(field: string, value: string): boolean {
    switch (field) {
      case 'email':
        const emailPattern = this.EMAIL_REGEX
        return emailPattern.test(value);

      case 'password':
      case 'newPassword':
      case 'confirmPassword':
        const passwordPattern = this.PASSWORD_REGEX
        return passwordPattern.test(value)

    }
  }

  public backendValidation(response: any, spErrorHandler: SpErrorHandler, exMsgFlag = false, errorType: "error" | "success" | "info" | "warn" = "error") {
    if (response.status === 400) {
      if (response.fieldErrors) {
        response.fieldErrors.forEach((error:any) => {
          spErrorHandler.addError(error?.fieldName, error?.error,);
        });
      }
      window.scrollTo(0, 0);
    }
  }

  // generateQrCode(authUrl: string): Promise<string> {
  //   return QRCode.toDataURL(authUrl);
  // }

  generateAuthUrl(authKeyData:GoogleAuth){
    return "otpAuth://totp/" + CoreConst.CURRENT_USER.id + "?secret=" + authKeyData.secretKey + "&issuer=" + AppName.PAA_CRYPTO;
  }

}
