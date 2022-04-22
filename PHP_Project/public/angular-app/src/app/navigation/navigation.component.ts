import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { AuthenticationService } from '../authentication.service';
import { HikingsDataService } from '../hikings-data.service';
import { Hiking } from '../hikings/hikings.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  get isLoggedIn() { return this._authService.isLoggedIn }
  @ViewChild("searchForm")
  searchForm!: NgForm
  typeOfPlace!: string

  hikings!: Hiking[]
  constructor(private hikingsDataService: HikingsDataService, private router: Router, private _authService: AuthenticationService) {

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
    this.router.navigate(["search", this.searchForm.value.typeOfPlace]).then(()=> window.location.reload())


  }

}
