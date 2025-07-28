import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { RegisterRequest } from '../models/register-request';
import { AuthService } from '../services/auth-service';
import { ToastService } from '../../shared/services/toast-service';
import { HttpStatusCustom } from '../../core/constants/core-const';
import { Router, RouterModule } from '@angular/router';
import { OtpVerification } from '../models/otp-verfication';
import { AppConst } from '../../shared/constants/app-const';
import { SpProgressBarService } from '../../shared/services/sp-progress-bar-service';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpErrorHandler, SpErrorHandlerData } from '../../shared/models/sp-error-handler';
import { AppUtilService } from '../../shared/services/app-util-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [
    SharedModule, CommonModule, FormsModule, RouterModule
  ],
  standalone: true
})
export class RegisterComponent {
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;

  capturedImage: string | null = null;
  isCameraOn: boolean = false;

  selectMedium: boolean = false;
  user: User = new User();
  otpVerification: OtpVerification;
  showProgressBar: boolean = false;
  otpSent: boolean = false;
  registerLoadingFlag: boolean = false;
  fieldErrors: any = [];
  seconds: number = 30;
  interval: any;
  spErrorHandler = new SpErrorHandler();
  profileImageUploaded: boolean;
  protected readonly EntityModuleCode = AppConst.ENTITY_MODULE_CODE
  protected readonly EntityDocType = AppConst.ENTITY_DOC_TYPE
  error: string;

  constructor(private appUtilService: AppUtilService, private authService: AuthService, private router: Router, private toastService: ToastService, private progressBarService: SpProgressBarService) {
  }

  proceedToVerification() {
    this.validateData()
    // if (!this.profileImageUploaded) {
    //   this.error = "Profile Image not uploaded";
    // }
    // else {
    //   this.error = ""
    // }

    if (!this.spErrorHandler.invalid) {
      if (this.otpSent) {
        this.validateOtp()
        if (!this.spErrorHandler.invalid) {
          this.registerUser();
        }

      } else {
        this.generateOTP();
      }
    }
  }

  registerUser() {
    // this.uploadCapturedImage();
    this.progressBarService.show();
    this.registerLoadingFlag = true;
    this.authService.registerUser(this.user).subscribe((response: any) => {
      if (response.status == HttpStatusCustom.OK && response.data.user) {
        this.user = response.data.user;
        this.toastService.showToast("success", "User registered successfully!");
        this.router.navigate(['/auth']);
        this.fieldErrors = [];
        this.progressBarService.hide();
        this.otpSent = false;
        this.user = new User();
      } else if (response.status == 400) {
        console.log(response.fieldErrors)

      } else {
        this.registerLoadingFlag = false;
        this.progressBarService.hide();
      }
    })

  }

  setOTPVerification() {
    this.otpVerification = new OtpVerification();
    this.otpVerification.email = this.user.email;
    this.otpVerification.otpType = AppConst.OTP_TYPE.REGISTER;
    this.otpVerification.emailCheckFlag = false;
  }

  generateOTP() {

    this.seconds = 30;
    this.registerLoadingFlag = true;
    this.setOTPVerification();
    this.authService.generateOtp(this.otpVerification).subscribe((response: any) => {
      if (response.status == HttpStatusCustom.OK && response.data.otpVerification) {
        this.toastService.showToast("success", "OTP has been sent to your email");
        this.otpVerification = response.data.otpVerification;
        this.otpSent = true;
        this.registerLoadingFlag = false;
        this.fieldErrors = [];
        this.startTimer();
      } else if (response.status === 400) {
        this.appUtilService.backendValidation(response, this.spErrorHandler);
        this.registerLoadingFlag = false;

      }
    })

  }

  startTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  // startCamera() {
  //   this.isCameraOn = true;
  //   this.capturedImage = null;
  //   this.selectMedium = false;

  //   navigator.mediaDevices.getUserMedia({ video: true })
  //     .then(stream => {
  //       this.videoElement.nativeElement.srcObject = stream;

  //     })
  //     .catch(error => {
  //       alert('Error accessing the camera: ' + error);
  //     });
  // }

  // retakePhoto() {
  //   this.capturedImage = null;
  //   this.startCamera();
  // }


  // capturePhoto() {
  //   if (!this.videoElement) return;
  //   const canvas = document.createElement('canvas');
  //   const video = this.videoElement.nativeElement;
  //   const context = canvas.getContext('2d');

  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;
  //   context.drawImage(video, 0, 0, canvas.width, canvas.height);

  //   this.capturedImage = canvas.toDataURL('image/png');

  //   const stream = video.srcObject as MediaStream;
  //   if (stream) {
  //     stream.getTracks().forEach(track => track.stop());
  //     video.srcObject = null;
  //   }
  //   this.isCameraOn = false;
  //   if (this.capturedImage) {
  //     this.profileImageUploaded = true;
  //   }

  // }

  // uploadCapturedImage() {
  //   this.user.documents = this.user.documents.filter(
  //     doc => doc.entityDocType !== AppConst.ENTITY_DOC_TYPE.PROFILE_IMAGE
  //   );
  //   const image = {
  //     fileName: `profile-image-${Date.now()}.png`,
  //     fileType: 'image/png',
  //     fileSize: this.capturedImage.length,
  //     entityDocType: AppConst.ENTITY_DOC_TYPE.PROFILE_IMAGE,
  //     entityModuleCode: AppConst.ENTITY_MODULE_CODE.USER,
  //     fileData: this.capturedImage.split(',')[1]
  //   };

  //   this.user.documents.push(image);
  // }

  validateData() {
    this.spErrorHandler.clearError()
    this.validateName();
    this.spErrorHandler.emptyCheck(this.user.email, 'email');
    if (this.user.email) {
      if (!AppUtilService.validateByPattern('email', this.user.email)) {
        this.spErrorHandler.addError('email', "Invalid Email Format");
      }
    }
    this.spErrorHandler.emptyCheck(this.user.userAuth.password, 'password');
    this.spErrorHandler.emptyCheck(this.user.existingPassword, 'existingPassword');
    if (this.user.userAuth.password) {
      if (!AppUtilService.validateByPattern('password', this.user.userAuth.password)) {
        this.spErrorHandler.addError('password', "Include uppercase,lowercase,special char(_@) and digits with 8 characters long");
      }
    }
    if (this.user.userAuth?.password !== this.user.existingPassword) {
      this.spErrorHandler.addError('existingPassword', "Password does not match");
    }

    this.spErrorHandler.emptyCheck(this.user.phoneNumber, 'phoneNumber');
    // this.spErrorHandler.emptyCheck(this.user.documents, 'documents');

  }

  validateOtp() {
    this.spErrorHandler.clearError()
    this.spErrorHandler.emptyCheck(this.user.otp, 'otp');
    if (this.user.otp && this.user.otp.length !== 6) {
      this.spErrorHandler.addError('otp', "Enter 6-digit OTP");
    }
  }

  errorHandler(parentKey: string, childKey?: string, index?: number): SpErrorHandlerData {
    return this.spErrorHandler.getErrorHandlerData(parentKey, childKey, index);
  }

  validateName() {
    const namePattern = /^[a-zA-Z\s]{3,}$/;
    this.spErrorHandler.emptyCheck(this.user.name, 'name');
    if (this.user.name && !namePattern.test(this.user.name)) {
      this.spErrorHandler.addError('name', "Name must be at least 3 characters long");
    }
  }

}
