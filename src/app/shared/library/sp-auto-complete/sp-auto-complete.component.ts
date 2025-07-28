import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DropDownModel } from '../../models/DropDownModel';
import { AutoCompleteOptionType } from '../../models/field-option';
import { DropdownSearchRequest } from '../../models/dropdown-search-request';
import { SpAutoCompleteDropdownApiService } from '../../services/sp-auto-complete-dropdown-api-service';
import { HttpStatusCustom } from '../../../core/constants/core-const';
import { ApiResponse } from '../../../core/models/api-response';
import { SpErrorHandlerData } from '../../models/sp-error-handler';

@Component({
  selector: 'app-sp-auto-complete',
  standalone: false,
  template: `
  <div class="mt-2">
    <p-floatlabel variant="on">
      <p-auto-complete
        [suggestions]="dropDownOptions"
        (completeMethod)="search($event)"
        (onClear)="setValue(dropDownValue)"
        (onSelect)="setValue(dropDownValue)"
        [completeOnFocus]="true"
        [(ngModel)]="dropDownValue"
        optionLabel="label"
        [appendTo]="appendTo"
        [disabled]="disabled"
      >
      </p-auto-complete>
      <label for="on_label">{{ label }}</label>
    </p-floatlabel>
     <div class="error-text" [style.visibility]="errorHandler?.invalid ? 'visible' : 'hidden'">
      <small>
      {{ errorHandler?.error || '\u00A0' }} <!-- Non-breaking space when no error -->
      </small>
    </div>
  </div>
  `,
  styleUrls: ['./sp-auto-complete.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpAutoCompleteComponent),
      multi: true
    }
  ]
})
export class SpAutoCompleteComponent implements ControlValueAccessor, OnInit {
  dropDownValue: any = null;
  @Input() dropDownOptions: DropDownModel[] = [];
  @Input() autoCompleteType: AutoCompleteOptionType;
  @Input() label: string = 'Select';
  @Input() codeAsLabel = false; //show the code as label to the dropdown
  @Input() codeAsValue = false; //set the dropdown code as value in ngModel
  @Input() idAsValue = false; //set the dropdown id as value in ngModel
  @Input() labelAsValue = false; //set the dropdown label as value in ngModel
  @Output() completeMethod: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input() accountId: string;
  @Input() userId: string;
  @Input() appendTo: any = 'body';
  @Input() disabled: boolean = false;
  @Input() errorHandler: SpErrorHandlerData | undefined;
  valueChange: boolean = false;

  @Output() onChange: EventEmitter<any> = new EventEmitter();
  value: any;

  constructor(private autoCompleteDropDownApi: SpAutoCompleteDropdownApiService) {
  }

  onTouched: () => void = () => {
  };
  onChangeCallback: (_: any) => void = () => {
  };

  ngOnInit() {
  }

  search(event: AutoCompleteCompleteEvent) {
    if (this.autoCompleteType) {
      const dropdownSearchRequest = new DropdownSearchRequest();
      this.setDropdownValues(dropdownSearchRequest);
      if (!(this.dropDownValue instanceof Object)) {
        dropdownSearchRequest.searchFor = this.dropDownValue
      }
      this.autoCompleteDropDownApi.searchDropDownList(dropdownSearchRequest).subscribe(response => {
        if (response && response.status === HttpStatusCustom.OK && response.data && response.data.dropdown) {
          this.dropDownOptions = response.data.dropdown.list;
          if (this.codeAsLabel) {
            for (let i = 0; i < this.dropDownOptions.length; i++) {
              this.dropDownOptions[i].label = this.dropDownOptions[i].code;
              this.dropDownOptions[i].code = this.dropDownOptions[i].label;
            }
          }
        } else {
          this.dropDownOptions = [];
        }
      });
    }
  }

  setValue(dropdownOption: DropDownModel) {
    if (this.codeAsValue) {
      this.value = dropdownOption?.code || null;
    } else if (this.idAsValue) {
      this.value = dropdownOption?.id || null;
    } else if (this.labelAsValue) {
      this.value = dropdownOption?.label || null;
    } else {
      this.value = dropdownOption?.code;
    }
    this.onChangeCallback(this.value);
    this.onChange.emit(dropdownOption);
  }

  writeValue(value: any): void {
    if (!value) {
      this.dropDownValue = null; // Ensure UI is updated when value is null
      return;
    }
    if (this.codeAsValue && value) {
      this.autoCompleteDropDownApi.findDropdownLabelByCode(value, this.autoCompleteType).subscribe(response => {
        this.handleAutoCompleteResponse(response);
      })
    }
    if (this.idAsValue && value) {
      this.autoCompleteDropDownApi.findDropdownLabelById(value, this.autoCompleteType).subscribe(response => {
        this.handleAutoCompleteResponse(response);
      })
    }
  }

  handleAutoCompleteResponse(response: ApiResponse) {
    if (response && response.status == HttpStatusCustom.OK && response.data.dropdown?.list) {
      this.valueChange = true
      this.dropDownOptions = []
      this.dropDownOptions = response.data.dropdown?.list;
      for (let i = 0; i < this.dropDownOptions.length; i++) {
        if (this.codeAsLabel && this.dropDownOptions[0].code) {
          this.dropDownOptions[0].label = this.dropDownOptions[0].code;
          this.dropDownValue = this.dropDownOptions[0];
        } else {
          this.dropDownValue = this.dropDownOptions[0];
        }
      }
    }
  }


  registerOnChange(fn: (value: any) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement if you need to handle the disabled state
  }

  setDropdownValues(dropdownSearchRequest: DropdownSearchRequest): void {
    if (this.codeAsLabel) {
      dropdownSearchRequest.searchFor = this.dropDownValue?.code;
    }
    dropdownSearchRequest.name = this.dropDownValue?.label;
    dropdownSearchRequest.autoCompleteType = this.autoCompleteType;
    dropdownSearchRequest.accountId = this.accountId;
    dropdownSearchRequest.userId = this.userId;
    dropdownSearchRequest.pageNumber = 1;
    dropdownSearchRequest.pageSize = 10;
  }
}
