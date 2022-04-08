import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css']
})
export class StarsRatingComponent implements OnInit, OnChanges {
  @Input()
  rating: number = 0;
  stars: number[] = []

  constructor() {

  }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {


    changes['rating'].currentValue;

    this.stars = new Array<number>(this.rating);
  }





}


