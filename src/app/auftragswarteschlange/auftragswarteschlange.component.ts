import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auftragswarteschlange',
  templateUrl: './auftragswarteschlange.component.html',
  styleUrls: ['./auftragswarteschlange.component.scss']
})
export class AuftragswarteschlangeComponent {

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
