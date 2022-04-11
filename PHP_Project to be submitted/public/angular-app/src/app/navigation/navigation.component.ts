import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { HikingsDataService } from '../hikings-data.service';
import { Hiking } from '../hikings/hikings.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild("searchForm")
  searchForm!: NgForm
  typeOfPlace!: string
  
  hikings!: Hiking[]
  constructor(private hikingsDataService: HikingsDataService, private router: Router) {

  }

  ngOnInit(): void {

  }
  search(searchForm: NgForm) {
    console.log(this.searchForm.value.typeOfPlace);
    this.hikingsDataService.search(this.searchForm.value.typeOfPlace).subscribe({
      next: hikings => {
        this.hikings = hikings;
       
      
      }, error: err => {
        console.log(err);

      }, complete: () => {
        console.log("Searching Done");

      }
    })
   this.router.navigate(["search", this.searchForm.value.typeOfPlace])


  }

}
