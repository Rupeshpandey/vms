import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DistrictsService {

  private baseUrl = 'https://localhost:7158/api';
  
  constructor(private http: HttpClient) { }

  getDistricts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/district`);
  }
}
