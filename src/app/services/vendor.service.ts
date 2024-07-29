import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VendorCompositeModel } from '../models/vendor-composite.model';


@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private apiUrl = 'https://localhost:7158/api/Vendor';

  constructor(private http: HttpClient) { }

  insertVendor(model: VendorCompositeModel): Observable<VendorCompositeModel> {
    return this.http.post<VendorCompositeModel>(this.apiUrl, model);
  }

  updateVendor(id: number, model: VendorCompositeModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model);
  }

  deleteVendor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getVendor(id: number): Observable<VendorCompositeModel> {
    return this.http.get<VendorCompositeModel>(`${this.apiUrl}/${id}`);
  }

  getVendors(): Observable<VendorCompositeModel[]> {
    return this.http.get<VendorCompositeModel[]>(this.apiUrl);
  }
}
