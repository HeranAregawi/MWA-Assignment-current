import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HikingsDataService } from '../hikings-data.service';
import { Hiking, Place } from "../hikings/hikings.component";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  hikings!: Hiking[]
  place!:Place
  typeOfPlace!: any
  searchForm!: any

  constructor(private route:ActivatedRoute, private hikingsDataService:HikingsDataService, private router: Router) { }

  ngOnInit(): void {
    const typeOfPlace = this.route.snapshot.params["typeOfPlace"]
    console.log(typeOfPlace);
    this.hikingsDataService.search(typeOfPlace).subscribe({
      next:hikings=>{
        
        this.hikings=hikings
        
      }, error:err=>{
        console.log(err);
        
      },
      complete:()=>{
        console.log("Searching Done");
        
      }
    })

  }
  
  // ngOnChanges(changes: SimpleChanges): void {

  //   changes['hikings'].currentValue;
  //   console.log(changes['hikings'].currentValue);

  // }
  // search(searchForm: any): void {
  //   this.hikings = searchForm;
  //   console.log("searching" + this.hikings);

  // }
}
