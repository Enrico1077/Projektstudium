import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private serverResponse: any;

  setServerResponse(response: any){
    this.serverResponse = response;
  }

  getServerResponse(){
    return this.serverResponse;
  }

  constructor() { }
}
