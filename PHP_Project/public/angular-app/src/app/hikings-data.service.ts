import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Hiking } from "./hikings/hikings.component";
import { NgForm } from '@angular/forms';
import { AuthenticationService } from "../app/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class HikingsDataService {
  
  private baseUrl: string = environment.REST_API_BASE_URL;
  constructor(private http: HttpClient) { }

  public getHikings(): Observable<Hiking[]> {
    const url :string= this.baseUrl + "/hikings";
    return this.http.get<Hiking[]>(url);
  }
  public getHiking(hikingId:string):Observable<Hiking>{
    const url: string = this.baseUrl + "/hikings/" + hikingId;
    return this.http.get<Hiking>(url);
  }
  public deleteHiking(hikingId:string){
    const url = this.baseUrl + "/hikings/" + hikingId;
    return this.http.delete(url)
  }
  public addHiking(addHikingForm:NgForm){
    const url = this.baseUrl + "/hikings" 
    const httpOptions ={
    headers: new HttpHeaders().set("Authorization" , localStorage.getItem(environment.TOKEN_STORAGE_KEY) as string)
    }
    return this.http.post(url, addHikingForm, httpOptions);
  }
  public updateHiking(hikingForm:NgForm, hikingId:string){
    const url: string = this.baseUrl + "/hikings/" + hikingId;
    return this.http.patch(url, hikingForm );
  }
  public addplace(place:any, hikingId:string){
    const url: string = this.baseUrl + "/hikings/" + hikingId + "/places"
    return this.http.patch(url, hikingId);
  }
  public search(typeOfPlace:string):Observable<Hiking[]>{
    const url: string = this.baseUrl + "/hikings/" + "search?typeOfPlace=" + typeOfPlace
    return this.http.get<Hiking[]>(url)
    
  }
 

}
