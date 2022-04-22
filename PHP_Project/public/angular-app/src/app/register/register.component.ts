import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Credentials } from '../login/login.component';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  get isLoggedIn() { return this._authService.isLoggedIn }
  successMessage: string = ""
  errorMessage: string = ""
  hasError: boolean = false
  hasSuccess: boolean = false
  @ViewChild("registrationForm")
  registrationForm!: NgForm
  constructor(private _userService: UserDataService,private _authService:AuthenticationService) { }

  ngOnInit(): void {
    this.registrationForm
  }
  onSubmit(registrationForm: NgForm) {
    // console.log("submiited");
    // console.log(this.registrationForm.value);
    let newUser: Credentials = new Credentials()
    if (newUser.fillFromForm(this.registrationForm)) {
      this._userService.registerUser(newUser).subscribe({
        next: (registeredUser) => {
          console.log(registeredUser);
          this.successMessage = "User created";
          this.hasError = false
          this.hasSuccess = true
        },
        error: (error) => {
          console.log("Register Error", error);
          this.errorMessage = "Registration Error"
          this.hasError = true
          this.hasSuccess = false
        },
        complete: () => {

        }
      });

    }
    else {
      this.errorMessage = "Passwords must match";
      this.hasError = true
      this.hasSuccess = false
    }

  }
}
