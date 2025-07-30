import {HttpRequestType, HttpService} from '../../core/services/http-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginRequest} from '../models/login-request';
import {OtpVerification} from '../models/otp-verfication';
import {ResetPassword} from '../models/reset-password';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpService: HttpService) {
  }

  loginUser(user: LoginRequest): Observable<any> {
    return this.httpService.getResponse('sociander/login', HttpRequestType.POST, user);
  }

  registerUser(user: User): Observable<any> {
    return this.httpService.getResponse('sociander/register', HttpRequestType.POST, user);
  }

  initData(): Observable<any> {
    return this.httpService.getResponse('sociander/init', HttpRequestType.GET);
  }

  generateOtp(otpVerification: OtpVerification): Observable<any> {
    return this.httpService.getResponse('sociander/generate-otp', HttpRequestType.POST, otpVerification);
  }

  otpVerification(otpVerification: OtpVerification): Observable<any> {
    return this.httpService.getResponse('sociander/otp-verify', HttpRequestType.POST, otpVerification);
  }

  updatePassword(resetPassword: ResetPassword): Observable<any> {
    return this.httpService.getResponse('sociander/reset-password', HttpRequestType.POST, resetPassword);
  }

}
