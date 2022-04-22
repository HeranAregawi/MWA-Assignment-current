import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { AuthenticationService } from '../authentication.service';
import { HikingsDataService } from '../hikings-data.service';
export class Place {
  #name!: string;
  #country!: string;
  #_id!: string
  get id() { return this.#_id }
  get name() { return this.#name }
  get country() { return this.#country }

  constructor(id: string, name: string, country: string) {
    this.#_id = id;
    this.#name = name;
    this.#country = country;
  }
}
export class Hiking {
  #_id!: string;
  #typeOfPlace!: string;
  #places!: Place[];
  #rating!: number;
  #feedback!: string
  get _id() { return this.#_id };
  get typeOfPlace() { return this.#typeOfPlace }
  get places() { return this.#places }
  get rating() { return this.#rating }
  get feedback() { return this.#feedback }
  set _id(id: string) { this.#_id = id };
  set typeOfPlace(typeOfPlace: string) { this.#typeOfPlace = typeOfPlace }
  set places(place: any) { this.#places = place }
  set rating(rating: number) { this.#rating = rating }
  set feedback(feedback: string) { this.#feedback = feedback }
  constructor(id: string, typeOfPlace: string, rating: number, feedback: string, place:Place[]) {
    this.#_id = id;
    this.#typeOfPlace = typeOfPlace;
    this.#rating = rating;
    this.#feedback = feedback;
    this.#places = place
  }
}
@Component({
  selector: 'app-hikings',
  templateUrl: './hikings.component.html',
  styleUrls: ['./hikings.component.css']
})

export class HikingsComponent implements OnInit {
  get isLoggedIn() {return this._authService.isLoggedIn}
  hikings!: Hiking[]
  constructor(private hikingsDataService: HikingsDataService, private _router: Router, private _authService:AuthenticationService) { }

  ngOnInit(): void {
    this.hikingsDataService.getHikings().subscribe(
      {
        next: hikings => {
          console.log(hikings);

          this.hikings = hikings;
        },
        error: err => {
          console.log(err);

        },
        complete: () => {
          console.log("Hikings found!");

        }
      }
    );
  }

  delete(hikingId: string): void {
    this.hikingsDataService.deleteHiking(hikingId).subscribe({
      next: response => {
        console.log(response);

      }, error: err => {
        console.log(err);

      },
      complete: () => {
        console.log("Hiking deleted Successfully!");

      }
    });
    this.hikings = this.hikings.filter(hiking => hiking._id != hikingId)
    this._router.navigate(["hikings"])
  }


}
