export class OtpVerification {
  id: string;
  email: string;
  otp: string;
  otpType: string;
  otpCreationTime: Date;
  otpExpiryTime: Date;
  emailCheckFlag: boolean;

}
