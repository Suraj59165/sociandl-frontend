import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SpErrorHandlerData } from '../../models/sp-error-handler';


@Component({
  selector: 'app-sp-input',
  standalone: false,
  template: `
 <div class="mt-3">
  <p-floatlabel variant="on">
    <div class="input-wrapper position-relative">
    <p-iconfield >
    <p-inputicon [ngClass]="icon" *ngIf="showStartIcon(id)"/>
      <input
        #inputElement
        pInputText
        [id]="id"
        [ngClass]="ngClass"
        [type]="showPassword ? 'text' : type"
        [(ngModel)]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [required]="required"
        [min]="min"
        [max]="max"
        [maxlength]="maxlength"
        [pattern]="pattern"
        [attr.autocomplete]="autocomplete"
        (input)="handleInput($event)"
        (keydown)="preventInvalidInput($event); onKeyDown.emit($event)"
        (keyup)="onKeyUp.emit($event)"
        (keypress)="onKeyPress.emit($event)"
        (paste)="onPaste.emit($event)"
        (focus)="handleFocus($event)"
        (blur)="handleBlur($event)"
        (change)="onChangeEvent.emit($event)"
        (click)="onClick.emit($event)"
        (dblclick)="onDblClick.emit($event)"
         (copy)="onCopy($event)"
        #ngModel="ngModel"
      />
      </p-iconfield>
      <label [for]="id">{{ placeHolder }}</label>

      <!-- Password toggle icon -->
      <i
        *ngIf="type === 'password'"
        class="pi"
        [ngClass]="!showPassword ? 'pi-eye-slash' : 'pi-eye'"
        (click)="togglePasswordVisibility()"
        style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;"
      ></i>
    </div>
  </p-floatlabel>

  <!-- Error display: always in DOM -->
  <div class="error-text" [style.visibility]="errorHandler?.invalid ? 'visible' : 'hidden'">
    <small>
      {{ errorHandler?.error || '\u00A0' }} <!-- Non-breaking space when no error -->
    </small>
  </div>
</div>

  `,
  styleUrls: ['./sp-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpInputComponent),
      multi: true
    }
  ],
})
export class SpInputComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  @Input() id: string = 'sp-input';
  @Input() ngClass: string | string[] | Set<string> | { [klass: string]: any } = 'w-100';
  @Input() placeHolder: string = 'Enter text';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() min?: number;
  @Input() max?: number;
  @Input() maxlength?: any; //for text, search, tel, url, email, and password
  @Input() pattern?: any;
  @Input() autocomplete: 'on' | 'off' | 'email' | 'current-password' = 'off';
  @Input() autofocus: boolean = false;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;
  @Input() submitted: boolean = false;
  @Output() onKeyPress = new EventEmitter<KeyboardEvent>();
  @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
  @Output() onKeyUp = new EventEmitter<KeyboardEvent>();
  @Output() onPaste = new EventEmitter<ClipboardEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onChangeEvent = new EventEmitter<Event>();
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Output() onDblClick = new EventEmitter<MouseEvent>();
  @Input() errorHandler: SpErrorHandlerData | undefined;
  @Input() icon?: string;
  showPassword: boolean = false;
  value: any = '';

  showStartIcon(id: string): boolean {
    return ['email', 'password','confirmPassword','username','phoneNumber'].includes(id); 
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngAfterViewInit(): void {
    if (this.autofocus) {
      this.inputElement.nativeElement.focus();
    }
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.type === 'number') {
      const numericValue = parseFloat(input.value);
      this.value = numericValue > 0 ? numericValue : '';
    } else {
      this.value = input.value;
    }

    this.onChange(this.value);
  }

  handleFocus(event: FocusEvent): void {
    this.onFocus.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.onTouched();
    this.onBlur.emit(event);
  }

  onChange: (value: any) => void = () => {
  };
  onTouched: () => void = () => {
  };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  preventInvalidInput(event: KeyboardEvent): void {
    if (this.type !== 'number') return;

    const invalidKeys = ['-', '+', 'e', 'E'];
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }

    // Prevent typing zero as the first character
    if (event.key === '0') {
      const input = this.inputElement.nativeElement;
      if (!input.value || input.selectionStart === 0) {
        event.preventDefault();
      }
    }
  }

  onCopy(event: ClipboardEvent): void {
    if (this.type === 'password') {
      event.preventDefault();
    }
  }


}
