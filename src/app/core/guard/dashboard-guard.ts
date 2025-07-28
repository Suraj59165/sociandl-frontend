import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '../../auth/services/token-service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const isAuth = await this.tokenService.IS_AUTHENTICATED_USER();
    if (isAuth) {
      console.log(isAuth)
      return true;
    }
    return this.router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
  }

}
