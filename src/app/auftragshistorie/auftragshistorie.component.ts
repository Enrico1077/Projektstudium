import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auftragshistorie',
  templateUrl: './auftragshistorie.component.html',
  styleUrls: ['./auftragshistorie.component.scss']
})
export class AuftragshistorieComponent {
  constructor(
    private globalService: GlobalService,
    private cookieService: CookieService
  ){}

  userLoggedIn(): boolean{
    if(this.cookieService.check('session'))
    {
      return true;
    }
    else{
      return false;
    }
  }
}
