import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Hiking } from "./hikings/hikings.component";

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

}
