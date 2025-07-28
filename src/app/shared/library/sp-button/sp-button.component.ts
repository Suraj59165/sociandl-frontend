import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Severity} from '../../models/field-option';

@Component({
  selector: 'app-sp-button',
  standalone: false,
  template: `
    <p-button
      [type]="type"
      [label]="label"
      [icon]="icon"
      [disabled]="disabled || loading"
      [severity]="severity"
      [loading]="loading"
      (click)="handleClick()"
      [ngClass]="ngClass"
      [styleClass]="styleClass"

    ></p-button>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpButtonComponent),
      multi: true,
    },
  ],
})
export class SpButtonComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  @Input() severity?: Severity
  @Input() type: string = 'button';
  @Input() loading: boolean = false;
  @Input() ngClass: string | string[] | Set<string> | { [klass: string]: any } = '';
  @Input() styleClass: string = ''; // PrimeNG-specific

  @Output() buttonClick = new EventEmitter<void>(); // Event when clicked

  private _value: any;
  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleClick(): void {
    if (!this.disabled && !this.loading) {
      this.onChange(this._value);
      this.onTouched();
      this.buttonClick.emit();
    }
  }
}
