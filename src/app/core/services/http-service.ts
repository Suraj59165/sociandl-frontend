import {environment} from '../../../environment';
import {ApiResponse} from '../models/api-response';
import {Observable} from 'rxjs';
import {HttpRequestService} from './http-request-service';
import {Injectable} from '@angular/core';
import {HttpResponseService} from './http-response-service';

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(private httpRequestService: HttpRequestService, private httpResponseService: HttpResponseService) {
  }

  private get apiUrl(): string {
    return environment.apiBaseUrl;
  }

  getResponse(endpoint: string, method: HttpRequestType, data?: any, params?: {
    [key: string]: string
  }): Observable<ApiResponse> {
    const url = `${this.apiUrl}${endpoint}`;
    const request$ = this.httpRequestService.sendRequest(method, url, data, params);
    const options = {
      method,
      url,
      data,
      params
    };
    return this.httpResponseService.handleResponse(request$, options);
  }
}

export class HttpRequestType {
  public static GET = 'GET';
  public static POST = 'POST';
  public static PUT = 'PUT';
  public static DELETE = 'DELETE';
  public static PATCH = 'PATCH';
  public static GET_VIA_POST = 'GET_VIA_POST';
}
