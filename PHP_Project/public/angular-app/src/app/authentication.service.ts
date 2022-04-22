import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  #isLoggedIn: boolean = false;
  get isLoggedIn() {
    return this.#isLoggedIn;
  }
  set isLoggedIn(isLoggedIn) {
    this.#isLoggedIn = isLoggedIn
  }
  set token(token) {
    localStorage.setItem(environment.TOKEN_STORAGE_KEY, token)
    this.isLoggedIn = true
  }
  get token() { return localStorage.getItem(environment.TOKEN_STORAGE_KEY) as string }
  get name(){
    let name:string="unknown";
    if(this.token){
      name = this._jwtService.decodeToken(this.token).name as string
    }
    return name
  }
  constructor(private _jwtService:JwtHelperService) { }
  
  deleteToken() {
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
