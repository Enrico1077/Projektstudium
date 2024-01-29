import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { User } from '../user';
import { GlobalService } from '../global.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['./anmelden.component.scss'],
})
export class AnmeldenComponent {
  topics = ['Angular', 'React', 'Vue'];

  topicHasError = true;

  userModel = new User('', '');

  validateTopic(value: string){
    if(value == 'default')
    {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  user = { username: '', password: ''};

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private cookieService: CookieService)
  {}

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  sendData(){
    const requestOptions = {
      withCredentials: true 
    };

  
    this.apiService.postData(this.userModel, 'apiUrlLogin', requestOptions ).subscribe(
      (response) => {
        console.log('Erfolgreich:', response);
        if(response.message=='Login has been sucessfull')
        {
          this.cookieService.set("login", "true");
          window.alert('Anmeldung erfolgreich!');
        }

      },
      (errorResponse) => {
        console.log('Fehler:', errorResponse);
        window.alert(errorResponse.error.error);
      }
    );
  }

  userLoggedIn(): boolean{
    if(this.cookieService.get("login")=="true")
    {
      return true;
    }
    else{
      return false;
    }
  }

  onFormSubmit(){
    console.log('Formular wurde eingereicht', this.userModel);
  }

  logOff(){
    this.cookieService.set("login","false");
  }
}
