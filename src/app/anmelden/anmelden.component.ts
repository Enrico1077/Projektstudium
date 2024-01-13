import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { User } from '../user';

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
    private formBuilder: FormBuilder)
  {}

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  sendData(){
    this.apiService.postData(this.userModel).subscribe(
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
