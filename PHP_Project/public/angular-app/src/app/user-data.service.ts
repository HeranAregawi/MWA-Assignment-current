import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials, LoginToken } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  public registerUser(user: Credentials):Observable<Credentials> {
    const url: string = environment.REST_API_BASE_URL + environment.REST_API_REGISTER_USER
    return this.http.post<Credentials>(url, user)
  }
  public login(user: Credentials):Observable<LoginToken> {
    const url: string = environment.REST_API_BASE_URL + environment.REST_API_REGISTER_USER+  environment.REST_API_LOGIN_USER
    return this.http.post<LoginToken>(url, user)
  }
}
