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
  apiUrlMachines: 'https://backend.projektstudium.xn--fr-den-bachelor-zvb.eu//profile/getMaschines', //gibt die IDs der mit dem aktuell angemeldeten Nutzer verbunden sind
  apiUrlData:     'https://backend.projektstudium.xn--fr-den-bachelor-zvb.eu//profile/getMaschineData' //gibt anhand einer MachineID alle Daten der Maschine zurück
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
