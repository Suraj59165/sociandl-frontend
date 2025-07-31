import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Menubar } from 'primeng/menubar';
import { DrawerModule } from 'primeng/drawer';
import { AccordionModule } from 'primeng/accordion';
import { FileUpload } from 'primeng/fileupload';
import { DatePickerModule } from 'primeng/datepicker';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';
import { TabsModule } from 'primeng/tabs';
import { ProgressBar } from 'primeng/progressbar'; // Import TabsModule
import { Card } from 'primeng/card';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Checkbox } from "primeng/checkbox";
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppUtilService } from '../shared/services/app-util-service';
import { AvatarModule } from 'primeng/avatar';
import { InputOtpModule } from 'primeng/inputotp';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout-dashboard/header/header.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutDashboardComponent,
    children: [

      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      },

    ]
  }
];

@NgModule({
  declarations: [

  
    LayoutDashboardComponent,
         HomeComponent,
         HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    SidebarModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    Menubar,
    DrawerModule,
    AccordionModule,
    FileUpload,
    DatePickerModule,
    FieldsetModule,
    ImageModule,
    TabsModule,
    ProgressBar,
    Card,
    ToggleButtonModule,
    Checkbox,
    RadioButtonModule,
    AvatarModule,
    InputOtpModule

  ],
  providers: [AppUtilService],

  exports: [
    RouterModule
  ]
})
export class SocialHandlerModule {
}
