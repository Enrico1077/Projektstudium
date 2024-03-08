import { Component } from '@angular/core';

@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.scss']
})

export class EinstellungenComponent {
  toggleDarkMode(): void {
    const body = document.body;
    body.classList.toggle('dark_mode');
    
  }
}
