import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { LoginRequest } from '../models/login-request';
import { HttpStatusCustom } from '../../core/constants/core-const';
import { ToastService } from '../../shared/services/toast-service';
import { TokenService } from '../services/token-service';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AppInitService } from '../../core/services/app-init.service';
import { SpProgressBarService } from '../../shared/services/sp-progress-bar-service';
import { SpErrorHandler, SpErrorHandlerData } from '../../shared/models/sp-error-handler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest = new LoginRequest();
  user: User = new User();
  value: any;
  loginLoadingFlag: boolean = false;
  spErrorHandler = new SpErrorHandler();
  returnUrl: string='';

  constructor(private authService: AuthService, private route: ActivatedRoute, private toastService: ToastService, private tokenService: TokenService, private router: Router, private appInitService: AppInitService, private progressBarService: SpProgressBarService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/paa-block';
    });
  }

  async login() {
    this.validateData()
    if (!this.spErrorHandler.invalid) {
      this.progressBarService.show();
      this.loginLoadingFlag = true;
      this.authService.loginUser(this.loginRequest).subscribe(async (response: any) => {
        if (response.status == HttpStatusCustom.OK && response.data.user) {
          this.user = response.data.user;
          this.tokenService.authentication(this.user.tokenResponse.authorization, this.user.tokenResponse.refreshToken);
          this.afterLogin(this.returnUrl);

        } else if (response.status == 400) {
          this.loginLoadingFlag = false;
          this.progressBarService.hide();
        } else {
          this.loginLoadingFlag = false;
          this.progressBarService.hide();
        }

      });
    }
  }

  validateData() {
    this.spErrorHandler.clearError()
    this.spErrorHandler.emptyCheck(this.loginRequest.email, 'email');
    this.spErrorHandler.emptyCheck(this.loginRequest.password, 'password');
  }

  afterLogin(route: string) {
    this.appInitService.getFrontendData().then(() => {
      this.router.navigateByUrl(route).then(r => {});
    })
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login().then(r => {});
    }
  }

  errorHandler(parentKey: string, childKey?: string, index?: number): SpErrorHandlerData {
    return this.spErrorHandler.getErrorHandlerData(parentKey, childKey, index);
  }

}

