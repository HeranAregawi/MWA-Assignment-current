import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HikingsComponent } from './hikings/hikings.component';
import { HttpClientModule } from '@angular/common/http';
import { HikingComponent } from './hiking/hiking.component';
import { StarRateComponent } from './star-rate/star-rate.component';
import { AddHikingComponent } from './add-hiking/add-hiking.component';
import { FormsModule } from '@angular/forms';
import { EditHikingComponent } from './edit-hiking/edit-hiking.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    HikingsComponent,
    HikingComponent,
    StarRateComponent,
    AddHikingComponent,
    EditHikingComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,


    RouterModule.forRoot([{
      path: "",
      component: HomeComponent
    }, {
      path: "hikings",
      component: HikingsComponent
    }, {
      path: "hiking/:hikingId",
      component: HikingComponent
    }, {
      path: "addHiking",
      component: AddHikingComponent
    }, {
      path: "editHiking/:hikingId",
      component: EditHikingComponent
    }, {
      path: "search/:typeOfPlace",
      component: SearchComponent
    }, {
      path: "register",
      component: RegisterComponent
    }, {
      path: "profile",
      component: ProfileComponent
    }, {
      path: "**",
      component: ErrorComponent

    }])
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
