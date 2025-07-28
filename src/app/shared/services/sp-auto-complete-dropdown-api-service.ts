import {Injectable} from '@angular/core';
import {HttpRequestType, HttpService} from '../../core/services/http-service';
import {DropdownSearchRequest} from '../models/dropdown-search-request';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../core/models/api-response';
import {AutoCompleteOptionType} from '../models/field-option';

@Injectable({providedIn: 'root'})
export class SpAutoCompleteDropdownApiService {
  private apiPath = 'auto-complete';

  constructor(private httpService: HttpService) {
  }

  searchDropDownList(dropdownSearchRequest: DropdownSearchRequest): Observable<ApiResponse> {
    return this.httpService.getResponse(this.apiPath + '/dropdown', HttpRequestType.POST, dropdownSearchRequest)
  }


  findDropdownLabelById(uid: string, autoCompleteType: AutoCompleteOptionType): Observable<ApiResponse> {
    const dropdownSearchRequest = new DropdownSearchRequest();
    dropdownSearchRequest.autoCompleteType = autoCompleteType;
    dropdownSearchRequest.uuid = uid;
    return this.httpService.getResponse(this.apiPath + '/dropdown/labelById', HttpRequestType.POST, dropdownSearchRequest)
  }

  findDropdownLabelByCode(code: string, autoCompleteType: AutoCompleteOptionType): Observable<ApiResponse> {
    const dropdownSearchRequest = new DropdownSearchRequest();
    dropdownSearchRequest.autoCompleteType = autoCompleteType;
    dropdownSearchRequest.name = code;
    return this.httpService.getResponse(this.apiPath + '/dropdown/labelByCode', HttpRequestType.POST, dropdownSearchRequest)
  }


}
