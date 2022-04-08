import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
addForm!: FormGroup;

   constructor(private formBuilder: FormBuilder, private gameService: GamesDataService, private router: Router) { 

    this.addForm = this.formBuilder.group({
      'title' : "",
      'year' : "",
      'rate' : "",
      'price' : "",
      'minPlayers' : "",
      'maxPlayers' : "",
      'minAge' : ""
      
    })
    // this.addForm = new FormGroup({
    //   title : new FormControl(),
    //   year : new FormControl()

    // })
  }

  ngOnInit(): void {
  }
  add(){
   
    console.log(this.addForm.value);

    this.gameService.addGame(this.addForm.value).subscribe({
      next:response=>{
        console.log(response);
        
      },
      error:err=>{
        console.log(err);
        
      },
      complete: ()=>{
        console.log("Done!");
        
      }
    })
    
    this.router.navigate(["games"])
    
    
    
  }

}
