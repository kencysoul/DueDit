import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { region } from './model/region.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    return this.http.get<region>('assets/region.json');
  }
}
