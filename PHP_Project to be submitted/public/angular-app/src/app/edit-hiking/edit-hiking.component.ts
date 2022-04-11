import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { response } from 'express';
import { HikingsDataService } from '../hikings-data.service';
import { Hiking, Place } from "../hikings/hikings.component";
@Component({
  selector: 'edit-hiking',
  templateUrl: './edit-hiking.component.html',
  styleUrls: ['./edit-hiking.component.css']
})
export class EditHikingComponent implements OnInit {
  @ViewChild("hikingForm")
  hikingForm!: NgForm
  hiking!: Hiking;
  places!: Place[]
  size:number=Place.length


  constructor(private hikingsDataService: HikingsDataService, private route: ActivatedRoute, private router: Router) {
    this.hiking = new Hiking("", "", 0, "", [])
    console.log(this.hiking);
    setTimeout(() => {
      console.log("timeout", this.hikingForm.value);
      this.hikingForm.setValue(this.hiking);
    }, 0);
  }
  ngOnInit(): void {
    const hikingId = this.route.snapshot.params["hikingId"]
    this.getHiking(hikingId)
  }
  getHiking(hikingId: string) {
    this.hikingsDataService.getHiking(hikingId).subscribe({
      next: hiking => {
        this.hiking.typeOfPlace = hiking.typeOfPlace;
        this.hiking.rating = hiking.rating;
        this.hiking.feedback = hiking.feedback;
        this.hiking._id = hiking._id;
        this.places= hiking.places;


      }
    });
    setTimeout(() => {
      console.log("timeout", this.hikingForm.value);
      this.hikingForm.setValue(this.hiking);
    }, 0);

  }
  updateHiking(hikingForm: NgForm) {
    console.log(this.hikingForm.value);
    this.hikingsDataService.updateHiking(this.hikingForm.value, this.hiking._id).subscribe({
      next: response => {
        console.log("Updated Successfully");

      }, error: err => {
        console.log(err);

      }, complete: () => {
        console.log();
      }
    })
    this.router.navigate(["hikings"])
  }
  // addPlace() { 
  //   this.flag=!this.flag;
  // }
  ngOnChanges(changes: SimpleChanges): void {

    changes['places'].currentValue;
    this.places = new Array<Place>(this.places.length);
}
  public editPlace() {

  }
 
  
}
