import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([{
      path: "",
      component: HomeComponent
    },{
      path: "hikings",
      component: HikingsComponent
    },{
      path:"hiking/:hikingId",
      component: HikingComponent
    },{
      path:"addHiking",
      component:AddHikingComponent
    },{
      path:"editHiking/:hikingId",
      component:EditHikingComponent
    },{
      path:"search/:typeOfPlace",
      component:SearchComponent
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
