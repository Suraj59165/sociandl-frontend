import {TokenService} from '../../auth/services/token-service';
import {Injectable} from '@angular/core';
import {HttpRequestType} from './http-service';
import {from, Observable, throwError} from 'rxjs';
import {Http} from '@capacitor-community/http';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  constructor(private tokenService: TokenService) {
  }

  public sendRequest(method: HttpRequestType, url: string, data?: any, params?: {
    [key: string]: string
  }): Observable<any> {
    const headers = this.prepareHeaders();
    const options: any = {
      url,
      headers: headers,
      params: params ? params : {},
      connectTimeout: 60000,
      readTimeout: 60000,
      webFetchExtra: {
        credentials: "include"
      }
    };
    console.log(options);
    if (method !== HttpRequestType.GET && method !== HttpRequestType.DELETE) {
      options.data = data;
    }

    let request$: Observable<any>;
    switch (method) {
      case HttpRequestType.GET:
        request$ = from(Http.get(options));
        break;
      case HttpRequestType.DELETE:
        request$ = from(Http.del(options));
        break;
      case HttpRequestType.POST:
        options.data = data;
        request$ = from(Http.post(options));
        break;
      case HttpRequestType.PUT:
        options.data = data;
        request$ = from(Http.put(options));
        break;
      case HttpRequestType.GET_VIA_POST:
        options.data = data;
        request$ = from(Http.post(options));
        break;
      default:
        throw new Error('Unsupported request method.');
    }

    return request$.pipe(
      map(res => {
        return res.data;
      }),
      catchError(error => {
        console.error('Request error:', error);
        return throwError(() => error);
      })
    );
  }

  private prepareHeaders(): { [header: string]: string } {
    const headers: { [header: string]: string } = {
      'Content-Type': 'application/json; charset=utf-8'
    };

    const token = this.tokenService.getAuthorizationToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

}
