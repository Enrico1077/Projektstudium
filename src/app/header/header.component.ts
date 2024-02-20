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
    });

    // Define a function 
    function toggleNav() {
      // Select your element
      const nav = document.querySelector('.nav') as HTMLElement;

      // Set the display style of the nav element based on its current value
      nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';

      // Select all the elements inside the navigation links
      const links = document.querySelectorAll(".nav ul li a");

      // Remove the active class from each element
      links.forEach(function(link) {
        link.classList.remove("active");
      });

      // Select the element that matches the current URL
      const currentLink = document.querySelector(".nav ul li a[href='" + window.location.pathname + "']");

      // If a matching element is found, add the active class to it
      if (currentLink) {
        currentLink.classList.add("active");
      }
    }

    // Call the toggleNav function
    toggleNav();
  }
}