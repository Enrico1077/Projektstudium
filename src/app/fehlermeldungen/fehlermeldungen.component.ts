import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-fehlermeldungen',
  templateUrl: './fehlermeldungen.component.html',
  styleUrls: ['./fehlermeldungen.component.scss']
})
export class FehlermeldungenComponent {

  constructor(
    private cookieService: CookieService
    ){}

  hintergrundBildUrl = '/pfad/zum/dynamischen/bild.jpg';

  userLoggedIn(): boolean{
    if(this.cookieService.check('session'))
    {
      return true;
    }
    else{
      return true;;
    }
  }
}
