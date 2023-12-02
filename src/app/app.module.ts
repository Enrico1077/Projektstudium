import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IndexContentComponent } from './index-content/index-content.component';
import { AuftragshistorieComponent } from './auftragshistorie/auftragshistorie.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexContentComponent,
    AuftragshistorieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
