import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.css']
})
export class StarRateComponent implements OnInit {
  @Input()
  rating: number = 0;
  stars: number[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {

    changes['rating'].currentValue;
    this.stars = new Array<number>(this.rating);
  }
}
