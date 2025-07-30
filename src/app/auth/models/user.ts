import { Roles } from '../../core/models/roles';
import { TokenResponse } from '../../core/models/token-response';
import { Documents } from '../../shared/models/Documents';
import { Audit } from '../../shared/models/Audit';
import { Merchant } from '../../shared/models/merchant';
import {Account} from './account';

export class User extends Audit {
  public id: string;
  public name: string;
  public email: string;
  public countryCode: string;
  public phoneNumber: string;
  public countryTimeZone: string;
  public verificationStatus: string;
  public status: string;
  public rolesList: Roles[] = []
  public tokenResponse: TokenResponse;
  public otp: string;
  public documents: Documents[] = [];
  public profileUrl: string;
  public isAdmin: boolean;
  public existingPassword: string;
  public newPassword: string;
  public passwordUpdatedFlag: boolean;
  public userAuth : UserAuth = new UserAuth();

}

export class UserAuth extends Audit {
  public id: string;
  public password: string;
  public plainPassword: string;
  public googleAuthSecKey: string;
}
