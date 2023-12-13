import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://development-pxx2px2qgq-ez.a.run.app/JsonTest';

  constructor(private http: HttpClient) {}

  postData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
