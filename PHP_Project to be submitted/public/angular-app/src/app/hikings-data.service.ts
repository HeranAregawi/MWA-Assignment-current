import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Hiking } from "./hikings/hikings.component";
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HikingsDataService {
  private baseUrl: string = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }

  public getHikings(): Observable<Hiking[]> {
    const url :string= this.baseUrl + "hikings";
    return this.http.get<Hiking[]>(url);
  }
  public getHiking(hikingId:string){
    const url: string = this.baseUrl + "hikings/" + hikingId;
    return this.http.get<Hiking>(url);
  }
  public deleteHiking(hikingId:string){
    const url = this.baseUrl + "hikings/" + hikingId;
    return this.http.delete(url)
  }
  public addHiking(addHikingForm:any){
    const url = this.baseUrl + "hikings"
    return this.http.post<any>(url, addHikingForm);
  }
  public updateHiking(hikingForm:any, hikingId:string){
    const url: string = this.baseUrl + "hikings/" + hikingId;
    return this.http.patch<any>(url, hikingForm);
  }
  public addplace(place:any, hikingId:string){
    const url: string = this.baseUrl + "hikings/" + hikingId + "/places"
    return this.http.patch<any>(url, hikingId);
  }
  public search(typeOfPlace:string){
    const url: string = this.baseUrl + "hikings/" + "search?typeOfPlace=" + typeOfPlace
    return this.http.get<any>(url)
    
  }
 

}
