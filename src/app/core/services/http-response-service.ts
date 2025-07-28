import {Observable, of, throwError} from 'rxjs';
import {catchError, finalize, mergeMap} from 'rxjs/operators';
import {CoreConst, HttpStatusCustom} from '../constants/core-const';
import {environment} from '../../../environment';
import {ToastService} from '../../shared/services/toast-service';
import {AppConst} from '../../shared/constants/app-const';
import {Injectable} from '@angular/core';
import {TokenService} from '../../auth/services/token-service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HttpResponseService {

  constructor(private toastService: ToastService, private router: Router) {
  }

  public handleResponse(request: Observable<any>, options: any): Observable<any> {
    const started = Date.now();
    return request.pipe(
      mergeMap(evt => this.processResponse(evt, options)),
      catchError(err => this.handleError(err)),
      finalize(() => this.finalizeRequest(options.url, started))
    );
  }

  private processResponse(evt: any, options: any): Observable<any> {
    switch (evt.status) {
      case HttpStatusCustom.SQL_EXCEPTION:
        return this.handleSqlException(evt);
      case HttpStatusCustom.EXPIRED_JWT_EXCEPTION:
        return this.handleExpiredJwtException(evt, options);
      case HttpStatusCustom.REFRESH_TOKEN_EXPIRED:
        return this.handleRefreshTokenExpired(evt);
      case HttpStatusCustom.REFRESH_COOKIE_NOT_FOUND:
        return this.handleRefreshCookieNotFound(evt);
      case HttpStatusCustom.BAD_REQUEST:
        return this.handleBadRequest(evt);
      case HttpStatusCustom.DEPLOYMENT_IN_PROGRESS:
        return this.handleDeploymentInProgress(evt);
      case HttpStatusCustom.USER_NOT_VERIFIED:
        return this.handleUserRelatedException(evt);
      case HttpStatusCustom.USER_DISABLED:
        return this.handleUserRelatedException(evt);
      case HttpStatusCustom.CUSTOM_MSG_EXCEPTION:
        return this.handleUserRelatedException(evt);
      case HttpStatusCustom.USER_NOT_FOUND:
        return this.handleUserRelatedException(evt);
      case HttpStatusCustom.ACCESS_DENIED:
        return this.handleUserRelatedException(evt);
      case HttpStatusCustom.PASSWORD_MISMATCH:
        return this.handleUserRelatedException(evt);
      case HttpStatusCustom.MISMATCH_OTP_EXCEPTION:
        return this.handleOtpMismatchException(evt);
      case HttpStatusCustom.EXPIRED_OTP_EXCEPTION:
        return this.handleExpiredOtpException(evt);
      case HttpStatusCustom.OPTIMISTIC_LOCK_EXCEPTION:
        return this.handleOptimisticLockException(evt);
      default:
        return of(evt);
    }
  }

  private handleError(error: any): Observable<never> {
    if (!navigator.onLine) {
      this.toastService.showToast('warn', 'No Internet Connection');
    } else {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        this.toastService.showToast('error', 'Backend server is not reachable. Please try again later');
        TokenService.clearEverything();
        this.router.navigate(['/auth']);
      } else {
        this.toastService.showToast('error', 'Backend server is not reachable. Please try again later');
        TokenService.clearEverything();
        this.router.navigate(['/auth']);
        this.toastService.showToast('error', AppConst.EX_MSG,);
      }
    }
    return throwError(() => error);
  }

  private finalizeRequest(url: string, started: number): void {
    if (!environment.production) {
    }
  }

  private handleSqlException(evt: any): Observable<any> {
    this.toastService.showToast('error', evt.customMessage);
    return of(evt);
  }

  private handleRefreshTokenExpired(evt: any): Observable<any> {

    // this.logoutService.broadcastLogout();
    return of(evt);
  }

  private handleRefreshCookieNotFound(evt: any): Observable<any> {
    TokenService.clearEverything();
    return of(evt);
  }

  private handleBadRequest(evt: any): Observable<any> {
    // this.router.navigate(['auth']);
    return of(evt);
  }

  private handleDeploymentInProgress(evt: any): Observable<any> {
    CoreConst.DEPLOYMENT_IN_PROGRESS = true;
    this.router.navigate(['deployment-status']);
    this.toastService.showToast('info', evt.customMessage);
    return of(evt);
  }

  private handleExpiredJwtException(evt: any, options: any): Observable<any> {
    TokenService.clearEverything();
    this.router.navigate(['/auth']);
    return of(evt);
  }

  private handleUserRelatedException(evt: any): Observable<any> {
    this.toastService.showToast('error', evt.customMessage);
    return of(evt);
  }

  private handleOtpMismatchException(evt: any): Observable<any> {
    this.toastService.showToast('error', evt.exMessage);
    return of(evt);
  }

  private handleExpiredOtpException(evt: any): Observable<any> {
    this.toastService.showToast('error', evt.exMessage);
    return of(evt);
  }

  private handleOptimisticLockException(evt: any): Observable<any> {
    this.toastService.showToast('warn', evt.customMessage);
    return of(evt);
  }

}
