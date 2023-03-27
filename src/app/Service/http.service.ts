import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { ErrorResponseDto, QueryParamsDto, ResponseDto } from '../Models/Common/Response';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _route: Router, private _http: HttpClient) { }

  ReturnParameterizedUrl(params: QueryParamsDto[]): HttpParams {

    // params
    let httpParams: HttpParams = new HttpParams();
    if (!params) {
      return httpParams;
    }

    params.forEach(res => {
      if (res.value) {

        if (Array.isArray(res.value)) {
          let arr = res.value as string[];
          httpParams = httpParams.append(res.key, JSON.stringify(arr.join(',')));
        } else if (typeof res.value == 'object') {
          Object.keys(res.value).forEach(k => {
            httpParams = httpParams.append(k, res.value[k]);
          })
        } else {
          httpParams = httpParams.append(res.key, res.value);
        }

      }
    })

    return httpParams;

  }

  GET(url: string, params: QueryParamsDto[] = []) {
    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);

    // headers
    var userDataStr = localStorage.getItem('UserData')
    var user;
    if (userDataStr != null && userDataStr != ' ') {
      user = JSON.parse(userDataStr);
    }

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    if (user && user["token"]) {
      headers = headers.append('Authorization', "Bearer " + user["token"]);
    }
    return this._http.get(url, { observe: 'response', params: httpParams, headers }).pipe(
      catchError((err) => {
        return throwError(err.error);
      }),
      map(res => res.body as ResponseDto)

    );

  }

  POST(url: string, body: any = null, params: QueryParamsDto[] = [], containFiles: boolean = false) {
    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);
    // headers

    var userDataStr = localStorage.getItem('UserData')
    var user;
    if (userDataStr != null && userDataStr != ' ') {
      user = JSON.parse(userDataStr);
    }

    let headers: HttpHeaders = new HttpHeaders();
    headers.append(`${containFiles ? 'Accept' : 'Content-Type'}`, 'application/json');
    if (user && user["token"]) {
      headers = headers.append('Authorization', "Bearer " + user["token"]);
    }

    return this._http.post(url, body, { observe: 'response', params: httpParams, headers: headers }).pipe(
      catchError((err) => {
        return throwError(err.error as ErrorResponseDto);
      }),
      map(res => res.body as ResponseDto)
    );

  }

  // PUT request
  PUT(url: string, body: any = null, params: QueryParamsDto[] = [], containFiles: boolean = false) {
    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);
    // headers

    var userDataStr = localStorage.getItem('UserData')
    var user;
    if (userDataStr != null && userDataStr != ' ') {
      user = JSON.parse(userDataStr);
    }

    let headers: HttpHeaders = new HttpHeaders();
    headers.append(`${containFiles ? 'Accept' : 'Content-Type'}`, 'application/json');
    if (user && user["token"]) {
      headers = headers.append('Authorization', "Bearer " + user["token"]);
    }


    return this._http.put(url, body, { observe: 'response', params: httpParams, headers })
      .pipe(
        catchError((err) => {
          return throwError(err.error as ErrorResponseDto);
        }),
        map(res => res.body as ResponseDto)
      );

  }

  // DELETE request
  DELETE(url: string, params: QueryParamsDto[] = []) {

    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);

    // headers
    var userDataStr = localStorage.getItem('UserData')
    var user;
    if (userDataStr != null && userDataStr != ' ') {
      user = JSON.parse(userDataStr);
    }

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    if (user && user["token"]) {
      headers = headers.append('Authorization', "Bearer " + user["token"]);
    }
    return this._http.delete(url, { observe: 'response', params: httpParams, headers })
      .pipe(
        catchError((err) => {
          return throwError(err.error);
        }),
        map(res => res.body as ResponseDto)
      );

  }

  // DELETE without Query Params request
  DELETE_With_ID(url: string) {

    // headers
    var userDataStr = localStorage.getItem('UserData')
    var user;
    if (userDataStr != null && userDataStr != ' ') {
      user = JSON.parse(userDataStr);
    }

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    if (user && user["token"]) {
      headers = headers.append('Authorization', "Bearer " + user["token"]);
    }
    return this._http.delete(url, { observe: 'response', headers: headers })
      .pipe(
        catchError((err) => {
          return throwError(err.error);
        }),
        map(res => res.body as ResponseDto)
      );

  }

  GetRequestHeader(containFiles: boolean = false) {
    // headers
    var userDataStr = localStorage.getItem('UserData')
    var user;
    if (userDataStr != null && userDataStr != ' ') {
      user = JSON.parse(userDataStr);
    }

    let headers: HttpHeaders = new HttpHeaders();
    headers.append(`${containFiles ? 'Accept' : 'Content-Type'}`, 'application/json');
    if (user && user["token"]) {
      headers = headers.append('Authorization', "Bearer " + user["token"]);
    }

    return headers;
  }

  getUserID() {
    var userDataStr = localStorage.getItem("UserData");
    var user;
    if (userDataStr != null && userDataStr != ' ') {
      user = JSON.parse(userDataStr);
    }
    return user["user"]['id'];
  }
}
