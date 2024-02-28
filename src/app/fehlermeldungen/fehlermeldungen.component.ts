import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-fehlermeldungen',
  templateUrl: './fehlermeldungen.component.html',
  styleUrls: ['./fehlermeldungen.component.scss']
})
export class FehlermeldungenComponent {

  constructor(
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
