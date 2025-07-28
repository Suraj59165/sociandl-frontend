import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {SpButtonComponent} from './library/sp-button/sp-button.component';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {SpInputComponent} from './library/sp-input/sp-input.component';
import {DropdownModule} from 'primeng/dropdown';
import {Toast} from 'primeng/toast';
import {Ripple} from 'primeng/ripple';
import {MessageService} from 'primeng/api';
import {SpAutoCompleteComponent} from './library/sp-auto-complete/sp-auto-complete.component';
import {AutoComplete, AutoCompleteModule} from 'primeng/autocomplete';
import {SpTableComponent} from './library/sp-table/sp-table.component';
import {TableModule} from 'primeng/table';
import {Paginator} from 'primeng/paginator';
import {SpNumberFormatPipe} from './pipes/SpNumberFormatPipe';
import {ProgressBar} from 'primeng/progressbar'
import { InputIconModule } from 'primeng/inputicon';;
import {Skeleton} from 'primeng/skeleton';
import { IconFieldModule } from 'primeng/iconfield';
import {SpProgressBarComponent} from './library/sp-progress-bar/sp-progress-bar.component';
import {SpAutoMultiselectComponent} from './library/sp-auto-multiselect/sp-auto-multiselect.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {SpDateComponent} from './library/sp-date/sp-date.component';
import {DatePickerModule} from 'primeng/datepicker';
import {SpDateTimeFormatPipe} from './pipes/spDateTimeFormat';
import {SpFileInputComponent} from './library/sp-file-input/sp-file-input.component';



@NgModule({
  declarations: [SpButtonComponent, SpInputComponent, SpAutoCompleteComponent, SpTableComponent, SpProgressBarComponent, SpAutoMultiselectComponent, SpDateComponent, SpFileInputComponent],
  imports: [
    CommonModule,
    ButtonModule,
    FloatLabel,
    FormsModule,
    InputText,
    DropdownModule,
    Toast,
    Ripple,
    AutoComplete,
    FloatLabel,
    AutoCompleteModule,
    Paginator,
    TableModule,
    SpNumberFormatPipe,
    ProgressBar,
    Skeleton,
    MultiSelectModule,
    DatePickerModule,
    SpDateTimeFormatPipe,
    InputIconModule,
    IconFieldModule,
  ],
  exports: [
    SpButtonComponent,
    SpInputComponent,
    SpAutoCompleteComponent,
    SpTableComponent,
    SpNumberFormatPipe,
    SpProgressBarComponent,
    SpAutoMultiselectComponent,
    SpDateComponent,
    SpDateTimeFormatPipe,
    SpFileInputComponent

  ],
  providers: [
    MessageService
  ]
})
export class SharedModule {
}
