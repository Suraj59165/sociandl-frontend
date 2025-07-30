import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './core/guard/auth-guard.service';
import {DashboardGuard} from './core/guard/dashboard-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'social-handler',
    loadChildren: () => import('./social-handler/social-handler.module').then(mod => mod.SocialHandlerModule),
    canActivate: [DashboardGuard]
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
