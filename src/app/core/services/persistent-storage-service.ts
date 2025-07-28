import {Injectable} from '@angular/core';
import CryptoJS from 'crypto-js';
import {CoreConst} from '../constants/core-const';

@Injectable({
  providedIn: 'root'
})
export class PersistentStorageService {
  private static encryptionKey = 'V{sQp4Ljftyj-4%He2ipOEK<OH%16{7`&3<-[IiqJGIE>AEsg3yn|h-RY-RvO<lJG9P6wh*K^of6U;Amt?8Pmuht4<SKs>LPcldDh{A{4^a>~&;PfQ:LC2ix7';

  constructor() {
  }

  public static setAuthorizationToken(token: string) {
    this.clearAuthorizationtoken()
    const encryptedToken = (this.encrypt(token)).toString();
    localStorage.setItem(CoreConst.AUTHORIZATION_KEY, encryptedToken);
  }

  public static getAuthorizationToken() {
    if (typeof localStorage != 'undefined') {
      const encryptedToken = localStorage.getItem(CoreConst.AUTHORIZATION_KEY);
      if (encryptedToken) {
        return this.decrypt(encryptedToken);
      }
    }
    return null;
  }

  public static clearAuthorizationtoken() {
    localStorage.removeItem(CoreConst.AUTHORIZATION_KEY);
  }

  public static setRefreshToken(token: string) {
    this.clearRefreshToken();
    const encryptedToken = (this.encrypt(token)).toString();
    localStorage.setItem(CoreConst.REFRESH_TOKEN_KEY, encryptedToken);
  }

  public static getRefreshToken() {
    if (typeof localStorage != 'undefined') {
      const encryptedToken = localStorage.getItem(CoreConst.REFRESH_TOKEN_KEY);
      if (encryptedToken) {
        return this.decrypt(encryptedToken);
      }
    }
    return null;
  }

  public static clearRefreshToken() {
    localStorage.removeItem(CoreConst.REFRESH_TOKEN_KEY);
  }

  public static clearEverything() {
    localStorage.clear()
  }

  private static encrypt(value: string) {
    return CryptoJS.AES.encrypt(value, PersistentStorageService.encryptionKey);
  }

  private static decrypt(value: string) {
    return CryptoJS.AES.decrypt(value, PersistentStorageService.encryptionKey).toString(CryptoJS.enc.Utf8);
  }
}
