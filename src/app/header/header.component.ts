import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(){}

  ngOnInit(): void{}

  isScreenWidthLessThanOrEqqual(width: number): boolean{
    return window.innerWidth <= width;
  }

}
