import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url={
  apiUrlRegister: 'https://backend.projektstudium.xn--fr-den-bachelor-zvb.eu//auth/register', //url zum registrieren (Konto erstellen)
  apiUrlLogin:    'https://backend.projektstudium.xn--fr-den-bachelor-zvb.eu//auth/login', //url zum login
  apiUrlProfile:  'https://backend.projektstudium.xn--fr-den-bachelor-zvb.eu//profile/test', //braucht cookie und stellt fest, ob man angemeldet ist
  apiGetMaschines:'https://backend.projektstudium.xn--fr-den-bachelor-zvb.eu//profile/getMaschines', //Braucht Cookie, gibt die ID der verbunden Maschinen zurück
  apiUrlGetData:  'https://backend.projektstudium.xn--fr-den-bachelor-zvb.eu//profile/getMaschineData'
  }

  constructor(
    private http: HttpClient) {}

  postData(data: any, _url: string, options?: any): Observable<any> {
    const apiUrl = (this.url as any)[_url];
    return this.http.post(apiUrl, data, options);
  }

  public getJsonData(): Observable<any>{
    return this.http.get('/assets/Hedelius_App.json');
  }

  //getData(data: any, _url: string, options?: any):
}
