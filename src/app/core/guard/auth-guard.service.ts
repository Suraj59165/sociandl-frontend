// no-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../../auth/services/token-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.tokenService.IS_AUTHENTICATED_USER();

    if (isAuthenticated) {
      this.router.navigate(['paa-block']);
      return false;
    }

    return true;
  }
}
