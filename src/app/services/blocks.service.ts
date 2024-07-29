import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {

  private baseUrl = 'https://localhost:7158/api';

  constructor(private http: HttpClient) { }

  getBlocks(districtId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/block/${districtId}`);
  }
}
