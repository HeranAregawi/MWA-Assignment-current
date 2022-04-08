import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { ActivatedRoute } from '@angular/router'
export class Game {
  #_id!: string;
  #title!: string;
  #year!: string;
  #rate!: number;
  #price!: number;
  #minPlayers!: number;
  #maxPlayers!: number;
  #minAge!: number;
  get _id() { return this.#_id };
  get title() { return this.#title };
  get year() { return this.#year };
  get rate() { return this.#rate };
  get price() { return this.#price };
  get minPlayers() { return this.#minPlayers };
  get maxPlayers() { return this.#maxPlayers };
  get minAge() { return this.#minAge }
  constructor(id: string, title: string, price: number) {
    this.#_id = id;
    this.#title = title;
    this.#price = price;
  }

}


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})


export class GamesComponent implements OnInit {
  game!: Game;
  games!: Game[]

  constructor(private gamesService: GamesDataService, private _router: Router, private route: ActivatedRoute) {
    const gameId = this.route.snapshot.params["gameId"];
  }


  ngOnInit(): void {
    this.gamesService.getGames().subscribe(games => this.games = games);

  }

  onDelete(gameId: string): void {
    // const gameId = this.route.snapshot.params["gameId"];
    // const game = this.gamesService.getGame(gameId).subscribe(game => this.game =game)
    console.log(gameId);

    this.gamesService.deleteGame(gameId).subscribe(game => this.game)
    this.games=this.games.filter(g=>g._id!=gameId)

  }

}
