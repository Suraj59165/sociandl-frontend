import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SpAutoCompleteDropdownApiService} from '../../services/sp-auto-complete-dropdown-api-service';
import {DropDownModel} from '../../models/DropDownModel';
import {AutoCompleteOptionType} from '../../models/field-option';
import {DropdownSearchRequest} from '../../models/dropdown-search-request';
import {HttpStatusCustom} from '../../../core/constants/core-const';
import {SpErrorHandlerData} from '../../models/sp-error-handler';

@Component({
  selector: 'app-sp-auto-multiselect',
  standalone: false,
  template: `
 <p-floatlabel variant="on">
  <p-multiSelect
    [options]="dropDownOptions"
    [(ngModel)]="dropDownValue"
    optionLabel="label"
    (onChange)="setValues(dropDownValue)"
    [appendTo]="appendTo"
    [disabled]="disabled"
    [filter]="true"
    [filterBy]="filterBy"
    [maxSelectedLabels]="maxSelectedLabels"
    display="chip"
    class="w-100"
    (onFocus)="handleFocus()">
  </p-multiSelect>
  <label>{{ label }}</label>
</p-floatlabel>
 <div *ngIf="errorHandler?.invalid" class="error-text">
   <small *ngIf="errorHandler?.error">{{ errorHandler?.error }}</small>
 </div>
  `,
  styleUrl: './sp-auto-multiselect.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpAutoMultiselectComponent),
      multi: true
    }
  ]
})
export class SpAutoMultiselectComponent implements ControlValueAccessor, OnInit {

  dropDownValue: DropDownModel[] = [];
  dropDownOptions: DropDownModel[] = [];

  @Input() autoCompleteType: AutoCompleteOptionType | undefined;
  @Input() label: string = 'Select';
  @Input() codeAsLabel = false;
  @Input() codeAsValue = false;
  @Input() idAsValue = false;
  @Input() labelAsValue = false;
  @Input() accountId: string | undefined;
  @Input() userId: string | undefined;
  @Input() appendTo: any = 'body';
  @Input() disabled: boolean = false;
  @Input() filterBy: string = 'label';
  @Input() maxSelectedLabels: number = 3;
  @Input() errorHandler: SpErrorHandlerData | undefined;


  @Output() onChange: EventEmitter<any> = new EventEmitter();

  value: any[] = [];

  constructor(private autoCompleteDropDownApi: SpAutoCompleteDropdownApiService) {
  }

  onTouched: () => void = () => {
  };

  onChangeCallback: (_: any) => void = () => {
  };

  ngOnInit(): void {

  }

  handleFocus(): void {
    this.loadDropdownOptions();
  }


  loadDropdownOptions(): void {
    const request = new DropdownSearchRequest();
    this.setDropdownValues(request);

    this.autoCompleteDropDownApi.searchDropDownList(request).subscribe(response => {
      if (response?.status === HttpStatusCustom.OK && response.data?.dropdown?.list) {
        this.dropDownOptions = response.data.dropdown.list;
        if (this.codeAsLabel) {
          this.dropDownOptions.forEach(opt => opt.label = opt.code);
        }
      } else {
        this.dropDownOptions = [];
      }
    });
  }

  setValues(selectedOptions: DropDownModel[]): void {
    if (!selectedOptions) {
      this.value = [];
    } else {
      this.value = selectedOptions.map(option => {
        if (this.codeAsValue) return option.code;
        if (this.idAsValue) return option.id;
        if (this.labelAsValue) return option.label;
        return option; // whole object
      });
    }

    this.onChangeCallback(this.value);
    this.onChange.emit(this.value);
  }

  writeValue(val: any[]): void {
    if (Array.isArray(val)) {
      this.value = val;
      this.dropDownValue = val;
    } else {
      this.value = [];
      this.dropDownValue = [];
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setDropdownValues(request: DropdownSearchRequest): void {
    request.autoCompleteType = this.autoCompleteType;
    request.accountId = this.accountId;
    request.userId = this.userId;
    request.pageNumber = 1;
    request.pageSize = 10;
  }
}

