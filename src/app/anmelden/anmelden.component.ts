import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-anmelden',
  template: '<button (click)="sendData()">Anmelden</button>',
})
export class AnmeldenComponent {
  constructor(private apiService: ApiService) {}

  sendData(){
    const userData = {
      username: 'Beispielbenutzername',
      password: 'BeispielPasswort',
    };

    this.apiService.postData(userData).subscribe(
      (response) => {
        console.log('Erfolgreich:', response);
      },
      (error) => {
        console.error('Fehler:', error);
      }
    );
  }

}
