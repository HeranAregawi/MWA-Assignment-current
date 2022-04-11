import { Component, OnInit } from '@angular/core';
import { HikingsDataService } from '../hikings-data.service';
class Place {
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
  #places!: Place;
  #rating!: number;
  #feedback!: string
  get _id() { return this.#_id };
  get typeOfPlace() { return this.#typeOfPlace }
  get places() { return this.#places }
  get rating() { return this.#rating }
  get feedback() { return this.#feedback }
  constructor(id: string, typeOfPlace: string, rating: number) {
    this.#_id = id;
    this.#typeOfPlace = typeOfPlace;
    this.#rating = rating
  }
}
@Component({
  selector: 'app-hikings',
  templateUrl: './hikings.component.html',
  styleUrls: ['./hikings.component.css']
})

export class HikingsComponent implements OnInit {
  hikings!: Hiking[]
  constructor(private hikingsDataService: HikingsDataService) { }

  ngOnInit(): void {
    this.hikingsDataService.getHikings().subscribe(hikings => this.hikings=hikings);
  }

}
