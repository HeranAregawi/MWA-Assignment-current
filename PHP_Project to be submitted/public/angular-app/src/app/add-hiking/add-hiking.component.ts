import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { HikingsDataService } from '../hikings-data.service';
import { Hiking, Place } from "../hikings/hikings.component";

@Component({
  selector: 'app-add-hiking',
  templateUrl: './add-hiking.component.html',
  styleUrls: ['./add-hiking.component.css']
})
export class AddHikingComponent implements OnInit {
  @ViewChild("addHikingForm")
  
  addHikingForm!: NgForm;
  
  hiking!: Hiking
  flag: boolean = false;
  places!: Place[];
  place!: Place;
  constructor(private hikingsDataService: HikingsDataService, private route: Router) {
    this.hiking = new Hiking("", "", 0, '', []);
    this.place = new Place("", "", "");


    setTimeout(() => {
      console.log("timeout", this.addHikingForm.value);
    }, 0); 
  }
  ngOnInit(): void {


  }
  addHiking(addHikingForm: NgForm) {
    console.log(addHikingForm.value);
    
    this.hikingsDataService.addHiking(this.addHikingForm.value).subscribe({
      next: response => {
        console.log(response);

      }, error: err => {
        console.log(err);

      }, complete: () => {
        console.log();

      }
    })
    this.route.navigate(["hikings"])
  }
  addPlace() {
    this.flag = !this.flag
    this.hikingsDataService.addplace(this.addHikingForm.value.place, this.addHikingForm.value.id)



  }
}
