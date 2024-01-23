import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-auftragshistorie',
  templateUrl: './auftragshistorie.component.html',
  styleUrls: ['./auftragshistorie.component.scss']
})
export class AuftragshistorieComponent {
test = true;

  constructor(
    private globalService: GlobalService
  ){}

  userLoggedIn(): boolean{
    return this.globalService.userLoggedIn;
  }

  //Login-Status mit Cookies überprüfen
  checkLoginStatus(){

  }

}
