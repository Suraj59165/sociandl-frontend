import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LayoutAuthComponent} from './layout-auth/layout-auth.component';
import {LoginComponent} from './login/login.component';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {Card} from 'primeng/card';
import {Button, ButtonDirective} from 'primeng/button';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {AutoComplete} from 'primeng/autocomplete';
import {ProgressBar} from "primeng/progressbar";
import {InputOtpModule} from 'primeng/inputotp';

const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)

      },
      {
        path: 'resetPassword',
        loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
      }
    ]
  }

]

@NgModule({
  declarations: [LoginComponent, LayoutAuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputGroup,
    InputGroupAddon,
    InputText,
    FloatLabel,
    Card,
    ButtonDirective,
    SharedModule,
    FormsModule,
    AutoComplete,
    Button,
    ProgressBar,
    InputOtpModule
  ],
  exports: [RouterModule]
})

export class AuthModule {
}
