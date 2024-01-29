import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url={
  apiUrlRegister: 'https://development-pxx2px2qgq-ez.a.run.app/auth/register', //url zum registrieren (Konto erstellen)
  apiUrlLogin:    'https://development-pxx2px2qgq-ez.a.run.app/auth/login', //url zum login
  apiUrlProfile:  'https://development-pxx2px2qgq-ez.a.run.app/profile/test' //braucht cookie und stellt fest, ob man angemeldet ist
  }

  constructor(
    private http: HttpClient) {}

  postData(data: any, _url: string, options?: any): Observable<any> {
    const apiUrl = (this.url as any)[_url];
    return this.http.post(apiUrl, data, options);
  }
}
