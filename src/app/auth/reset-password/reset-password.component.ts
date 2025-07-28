import { Component, HostListener } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../shared/services/toast-service';
import { SpProgressBarService } from '../../shared/services/sp-progress-bar-service';
import { OtpVerification } from '../models/otp-verfication';
import { HttpStatusCustom } from '../../core/constants/core-const';
import { AppConst } from '../../shared/constants/app-const';
import { ResetPassword } from '../models/reset-password';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { SpErrorHandler, SpErrorHandlerData } from '../../shared/models/sp-error-handler';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, InputOtpModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPasswordLoadingFlag: boolean = false;
  otpSent: boolean = false;
  otpVerification: OtpVerification = new OtpVerification();
  resetPassword: ResetPassword = new ResetPassword();
  spErrorHandler = new SpErrorHandler();

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService, private progressBarService: SpProgressBarService) {
  }

  reset() {
    this.validateData();
    if (!this.spErrorHandler.invalid) {
      this.resetPasswordLoadingFlag = true;
      this.authService.updatePassword(this.resetPassword).subscribe((response: any) => {
        if (response.status == HttpStatusCustom.OK && response.data.user) {
          this.toastService.showToast("success", "Password changed successfully");
          this.router.navigate(['/auth']);
          this.resetPasswordLoadingFlag = false;
        } else {
          this.resetPasswordLoadingFlag = false;
        }
      })
    }
  }

  setOTPVerification() {
    this.otpVerification = new OtpVerification();
    this.otpVerification.email = this.resetPassword.email;
    this.otpVerification.otpType = AppConst.OTP_TYPE.RESET_PASSWORD;
    this.otpVerification.emailCheckFlag = true;
  }

  sendOtp() {
    this.validateEmail();
    console.log(this.spErrorHandler);
    if (!this.spErrorHandler.invalid) {
      this.resetPasswordLoadingFlag = true;
      this.resetPassword.otp = '';
      this.setOTPVerification();
      this.authService.generateOtp(this.otpVerification).subscribe((response: any) => {
        if (response.status == HttpStatusCustom.OK && response.data.otpVerification) {
          this.toastService.showToast("success", "OTP has been sent to your email");
          this.otpVerification = response.data.otpVerification;
          this.otpSent = true;
          this.resetPasswordLoadingFlag = false;
          this.resetPassword.otp = '';
          this.resetPassword.password = ''
        } else {
          this.resetPasswordLoadingFlag = false;
        }
      })
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendOtp();
    }
  }

  validateEmail() {
    this.spErrorHandler.clearError()
    this.spErrorHandler.emptyCheck(this.resetPassword.email, 'email');
  }

  validateData() {
    this.spErrorHandler.clearError()
    this.spErrorHandler.emptyCheck(this.resetPassword.otp, 'otp');
    this.spErrorHandler.emptyCheck(this.resetPassword.password, 'password');
    this.spErrorHandler.emptyCheck(this.resetPassword.confirmPassword, 'confirmPassword');
    if ( this.resetPassword.otp && this.resetPassword.otp.length !== 6) {
       this.spErrorHandler.addError('otp', "Enter 6-digit OTP");
    }
    if (this.resetPassword.password !== this.resetPassword.confirmPassword) {
      this.spErrorHandler.addError('confirmPassword', "Password does not match");
    }
  }

  errorHandler(parentKey: string, childKey?: string, index?: number): SpErrorHandlerData {
    return this.spErrorHandler.getErrorHandlerData(parentKey, childKey, index);
  }
}
