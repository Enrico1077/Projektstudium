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

  sendData() {
    const requestOptions = {
      withCredentials: true,
    };
    this.loginForm.markAllAsTouched();
    this.loginAttempted = true;
    if (this.loginForm.valid) {
      this.apiService.postData(this.userModel, 'apiUrlLogin', requestOptions).subscribe(
        (response) => {
          console.log('Erfolgreich:', response);
          if (response.message == 'Login has been sucessfull') {
            window.alert('Anmeldung erfolgreich!');
          }
        },
        (errorResponse) => {
          console.log('Fehler:', errorResponse);
          window.alert(errorResponse.error.error);
        }
      );
    }
  }
  loginAttempted = false;

  onFormSubmit(){
    console.log('Formular wurde eingereicht', this.userModel);
  }

  logOff(){
    this.cookieService.delete("session");
    if(!this.cookieService.check("session"))
    {
      window.alert("Abmeldung erfolgreich!");
    }
  }

  getCookie(name: any) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf(name + '=') === 0) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  cookieExists(){
    var sessionCookie = this.getCookie('session');
    if (sessionCookie) {
      console.log('Session cookie exists with value:', sessionCookie);
    } else {
      console.log('Session cookie does not exist.');
    }


    const requestOptions = {
      withCredentials: true,
    };
    this.apiService.postData(this.userModel,'apiUrlProfile',requestOptions).subscribe(
      (response) => {
        console.log('Erfolgreich:', response);
      },
      (errorResponse) => {
        console.log('Fehler:', errorResponse);
      }
    );

    this.apiService.postData(this.userModel,'apiGetMaschines',requestOptions).subscribe(
      (response) => {
        console.log('Erfolgreich:', response);
      },
      (errorResponse) => {
        console.log('Fehler:', errorResponse);
      }
    );

  }
}
