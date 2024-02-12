import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { GlobalService } from '../global.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-anlageneffektivitaet',
  templateUrl: './anlageneffektivitaet.component.html',
  styleUrls: ['./anlageneffektivitaet.component.scss']
})



export class AnlageneffektivitaetComponent {

  constructor(
    private apiService: ApiService,
    private globalService: GlobalService,
    private cookieService: CookieService
  ){}

  sendData(){
    const requestOptions = {
      withCredentials: true,
    };

  //this.apiService.getData()

  }

}
