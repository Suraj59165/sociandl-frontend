import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SpErrorHandlerData} from '../../models/sp-error-handler';

@Component({
  selector: 'app-sp-date',
  standalone: false,
  template: `
  <div class="mt-2">
  <p-datepicker
    [(ngModel)]="value"
    [placeholder]="placeholder"
    [disabled]="disabled"
    [readonlyInput]="readonlyInput"
    [showTime]="showTime"
    [hourFormat]="hourFormat"
    [showIcon]="showIcon"
    [showButtonBar]="showButtonBar"
    [minDate]="minDate"
    [maxDate]="maxDate"
    [dateFormat]="dateFormat"
    [selectionMode]="selectionMode"
    [inputId]="inputId"
    [styleClass]="styleClass"
    [inline]="inline"
    [appendTo]="appendTo"
    (select)="onSelect.emit($event)"
    (input)="onInput.emit($event)"
    (ngModelChange)="onValueChange($event)"
    (blur)="handleBlur($event)"
    (focus)="onFocus.emit($event)"
    (close)="onClose.emit()"
    #ngModel="ngModel"
  ></p-datepicker>
    <div class="error-text" [style.visibility]="errorHandler?.invalid ? 'visible' : 'hidden'">
    <small>
      {{ errorHandler?.error || '\u00A0' }} <!-- Non-breaking space when no error -->
    </small>
  </div>
</div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpDateComponent),
      multi: true
    }
  ],
  styleUrls: ['./sp-date.component.css']
})
export class SpDateComponent implements ControlValueAccessor {

  @Input() dateValue: Date | null = null;
  @Input() placeholder: string = 'Select Date';
  @Input() disabled: boolean = false;
  @Input() readonlyInput: boolean = false;
  @Input() showTime: boolean = false;
  @Input() hourFormat: '12' | '24' = '24';
  @Input() showIcon: boolean = true;
  @Input() showButtonBar: boolean = true;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() dateFormat: string = 'dd-mm-yy';
  @Input() selectionMode: 'single' | 'multiple' | 'range' = 'single';
  @Input() inputId?: string;
  @Input() styleClass?: string;
  @Input() inline: boolean = false;
  @Input() appendTo: any = 'body';
  @Input() errorHandler: SpErrorHandlerData | undefined;

  @Output() dateValueChange = new EventEmitter<Date | Date[] | null>();
  @Output() onSelect = new EventEmitter<any>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onClose = new EventEmitter<void>();
  @Output() onInput = new EventEmitter<any>();

  value: Date | Date[] | null = null;

  onChange = (value: any) => {

  };
  onTouched = () => {
  };


  writeValue(value: Date | Date[] | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onValueChange(value: any) {
    this.value = value;
    this.onChange(this.value);
    this.dateValueChange.emit(this.value);
    this.onTouched();

  }

  handleBlur(event: Event): void {
    this.onTouched();
    this.onBlur.emit(event);
  }
}
