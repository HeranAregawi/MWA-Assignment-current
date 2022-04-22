import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
// import { userInfo } from 'os';
import { environment } from 'src/environments/environment';
import { UserDataService } from '../user-data.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
export class LoginToken{
  success:boolean =false;
  token:string=""
}
export class Credentials {
  name!: string
  username !: String;
  password!: string;
  public fillFromForm(form: FormGroup | NgForm): boolean {
    this.name = form.value.name
    this.username = form.value.username;
    this.password = form.value.password;
    return form.value.password == form.value.repeatpassword
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
get isLoggedIn (){return this._authService.isLoggedIn}
  userloggedIn: boolean = false;
  #name: string = "";
  // set name(name: string) { this.#name = name }
  get name() {
    // const token: string = localStorage.getItem(environment.TOKEN_STORAGE_KEY) as string;
    // if (token) {
    //   this.#name = new JwtHelperService().decodeToken(token).name
    // } else {
    //   this.#name = "unknown"
    // }

    // return this.#name
    return this._authService.name
  }

  @ViewChild("loginForm")
  loginForm!: NgForm
  credentials!: Credentials
  constructor(private _userService: UserDataService, private _authService:AuthenticationService, private _router:Router) {
  }
  ngOnInit(): void {
    this.credentials = new Credentials();
    this.credentials.username = ""
    this.credentials.password = ""
  }
  onSubmit(loginForm: NgForm) {
    console.log("Submitted");
    console.log(this.loginForm.value);
    let user = new Credentials()
    user.fillFromForm(loginForm);
    this._userService.login(user).subscribe({
      next: (loginToken) => {
      this.login(loginToken);

      },
      error: (err: any) => console.log("Login Error" + err),
      complete: () => console.log("Done")

    })
  }
  login(loginToken:LoginToken){
    console.log(loginToken);
    // localStorage.setItem(environment.TOKEN_STORAGE_KEY, loginResponse.token);
    // this._authService.isLoggedIn=true
    this._authService.token = loginToken.token;
    this._router.navigate(["/"])
  }

  logOut() {
    // localStorage.clear;
    this._authService.deleteToken()
  }
  reset(loginForm: NgForm) {
    loginForm.reset()
  }

}
