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

    const headerComponent = document.querySelector('app-header');
    if (headerComponent) {
      const logo = headerComponent.querySelector('.hedelius-logo') as HTMLImageElement;
      if (body.classList.contains('dark_mode')) {
        const darkImage = logo.dataset['dark'];
        if (darkImage) {
          logo.src = darkImage;
        }
      } else {
        logo.src = 'assets/img/logo.png';
      }
    }
  }
}
