import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';

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
    private formBuilder: FormBuilder)
  {}

  registerForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  sendData(){
    this.apiService.postData(this.userModel, 'apiUrlRegister').subscribe(
      (response) => {
        console.log('Erfolgreich:', response);
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
