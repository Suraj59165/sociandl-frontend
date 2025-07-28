import { Roles } from '../../core/models/roles';
import { TokenResponse } from '../../core/models/token-response';
import { Documents } from '../../shared/models/Documents';
import { Audit } from '../../shared/models/Audit';
import { Merchant } from '../../shared/models/merchant';
import {Account} from './account';
import {PaymentAccountDetails} from './payment-account-details';

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
  public account: Account;
  public appliedForMerchant: boolean;
  public countryName: string;
  public otp: string;
  public documents: Documents[] = [];
  public applicableForMerchant: boolean;
  public profileUrl: string;
  public defaultCurrency: string;
  public isAdmin: boolean;
  public isMerchant: boolean;
  public defaultCountryName: string;
  public existingPassword: string;
  public newPassword: string;
  public passwordUpdatedFlag: boolean;
  public merchant: Merchant;
  public paymentMethods: PaymentAccountDetails[] = [];
  public userAuth : UserAuth = new UserAuth();

}

export class UserAuth extends Audit {
  public id: string;
  public password: string;
  public plainPassword: string;
  public googleAuthSecKey: string;
}
