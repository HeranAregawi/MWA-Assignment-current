import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { response } from 'express';
import { runInThisContext } from 'vm';
import { AuthenticationService } from '../authentication.service';
import { HikingsDataService } from '../hikings-data.service';
import { Hiking } from "../hikings/hikings.component";

@Component({
  selector: 'app-hiking',
  templateUrl: './hiking.component.html',
  styleUrls: ['./hiking.component.css']
})
export class HikingComponent implements OnInit {
  get isLoggedIn() { return this._authService.isLoggedIn }
  hiking!: Hiking;
  place!: any
  // detailPlace:Object[]=new Array();
  constructor(private route: ActivatedRoute, private hikingsDataService: HikingsDataService, private router: Router, private _authService: AuthenticationService) {
    this.hiking = new Hiking("", "", 0, '', [])
  }

  ngOnInit(): void {
    const hikingId = this.route.snapshot.params["hikingId"];
    this.hikingsDataService.getHiking(hikingId).subscribe(
      {
        next: hiking => {
          this.hiking = hiking;
          this.place = this.hiking.places;



        },
        error: err => {
          console.log(err);

        },
        complete: () => {
          console.log("Hiking Found");

        }

      }
    )
  }
  delete() {
    const hikingId = this.route.snapshot.params["hikingId"];
    this.hikingsDataService.deleteHiking(hikingId).subscribe({
      next: response => {
        console.log(response);

      }, error: err => {
        console.log(err);

      }, complete: () => {
        console.log("Hiking deleted Successfully");
      }
    });
    this.router.navigate(["hikings"]);

  }


}
