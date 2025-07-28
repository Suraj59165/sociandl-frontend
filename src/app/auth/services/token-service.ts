import {Injectable} from '@angular/core';
import {PersistentStorageService} from '../../core/services/persistent-storage-service';
import {CoreConst} from '../../core/constants/core-const';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public static setRefreshToken(key: string) {
    this.clearRefreshToken();
    if (key) {
      PersistentStorageService.setRefreshToken(key);
    }
  }

  public static setAuthorizationToken(key: string) {
    this.clearAuthorizationToken();
    if (key) {
      PersistentStorageService.setAuthorizationToken(key);
    }
  }

  public static clearRefreshToken() {
    PersistentStorageService.clearRefreshToken();
  }

  public static clearAuthorizationToken() {
    PersistentStorageService.clearAuthorizationtoken();
  }

  public static async clearEverything() {
    CoreConst.CURRENT_USER = new User();
    CoreConst.USER_ROLE = []
    return PersistentStorageService.clearEverything();
  }

  async IS_AUTHENTICATED_USER(): Promise<boolean> {
    const authToken = this.getAuthorizationToken();
    const refreshToken = this.getRefreshToken();
    return !!(authToken && refreshToken);

  }

  getAuthorizationToken() {
    return PersistentStorageService.getAuthorizationToken();
  }

  getRefreshToken() {
    return PersistentStorageService.getRefreshToken();
  }

  authentication(authToken: string, refreshToken: string) {
    TokenService.setAuthorizationToken(authToken);
    TokenService.setRefreshToken(refreshToken);
  }

}
