import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { User } from '../user';
import { DataStorageService } from '../data-storage.service';


@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['./anmelden.component.scss'],
})
export class AnmeldenComponent {
  topics = ['Angular', 'React', 'Vue'];

  topicHasError = true;

  userModel = new User('', '');

  serverResponse: any;

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
    private dataStorage: DataStorageService)
  {}

  ngOnInit(){
    this.serverResponse = this.dataStorage.getServerResponse();
  }

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  sendData(){
    this.apiService.postData(this.userModel, 'apiUrlLogin').subscribe(
      (response) => {
        console.log('Erfolgreich:', response);
        this.dataStorage.setServerResponse(response);
      },
      (error) => {
        console.error('Fehler:', error);
      }
    );
  }

  getResponse(){
    return this.dataStorage;
  }

  onFormSubmit(){
    console.log('Formular wurde eingereicht', this.userModel);
  }

}
