import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  ngAfterViewInit(): void {
    const burger = document.querySelector('.burger') as HTMLElement;
    const nav = document.querySelector('.nav-links') as HTMLElement;
    const dropdown = document.querySelector('.dropdown-content') as HTMLElement;

    burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active');
      dropdown.classList.toggle('dropdown-active');
      burger.classList.toggle('toggle');

      // Move the .nav-links to the .dropdown-content
      if (dropdown.children.length === 0) {
        while (nav.firstChild) {
          dropdown.appendChild(nav.firstChild);
        }
      } else {
        while (dropdown.firstChild) {
          nav.appendChild(dropdown.firstChild);
        }
      }
    });


  }
}
