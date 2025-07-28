import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgOptimizedImage} from '@angular/common';
import {ToastService} from './shared/services/toast-service';
import {HttpService} from './core/services/http-service';
import {AppInitProvider, AppInitService} from './core/services/app-init.service';
import {appConfig} from './app.config';
import {ConfirmationService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    NgOptimizedImage
  ],
  providers: [HttpService, AppInitService, AppInitProvider, appConfig.providers, ToastService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
