import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.scss']
})
export class RegistrierenComponent {
  userModel = new User('','')
  user = { username: '', password: ''};

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private globalService: GlobalService)
  {}

  registerForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  sendData(){
    this.apiService.postData(this.userModel, 'apiUrlRegister').subscribe(
      (response) => {
        console.log('Erfolgreich:', response);
        if(response.message=='New user has been created and logged in.')
        {
          this.globalService.userLoggedIn=true;
          window.alert('Registrierung erfolgreich!');
        }
      },
      (error) => {
        console.error('Fehler:', error);
      }
    );
  }

  onFormSubmit(){
    console.log('Formular wurde eingereicht', this.userModel);
  }
}
