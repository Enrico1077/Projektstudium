import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IndexContentComponent } from './index-content/index-content.component';
import { AuftragshistorieComponent } from './auftragshistorie/auftragshistorie.component';
import { AuftragswarteschlangeComponent } from './auftragswarteschlange/auftragswarteschlange.component';
import { FehlermeldungenComponent } from './fehlermeldungen/fehlermeldungen.component';
import { AnlageneffektivitaetComponent } from './anlageneffektivitaet/anlageneffektivitaet.component';
import { AnmeldenComponent } from './anmelden/anmelden.component';
import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RegistrierenComponent } from './registrieren/registrieren.component';
import { CookieService } from 'ngx-cookie-service';
import { NgChartsModule } from 'ng2-charts';

//Definition der Routen bzw. Links, die auf die verschiedenen Dashboards leiten (Links aus Navigationsleiste)
const appRoute: Routes = [
  {path: '', component: IndexContentComponent},
  {path: 'auftragshistorie', component: AuftragshistorieComponent},
  {path: 'auftragswarteschlange', component: AuftragswarteschlangeComponent},
  {path: 'index-content', component: IndexContentComponent},
  {path: 'fehlermeldungen', component: FehlermeldungenComponent},
  {path: 'anlageneffektivitaet', component: AnlageneffektivitaetComponent},
  {path: 'anmelden', component: AnmeldenComponent},
  {path: 'einstellungen', component: EinstellungenComponent},
  {path: 'registrieren', component: RegistrierenComponent},
  {path: '**', component: ErrorComponent} //Error Route immer als letzte schreiben!
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexContentComponent,
    AuftragshistorieComponent,
    AuftragswarteschlangeComponent,
    AnlageneffektivitaetComponent,
    AnmeldenComponent,
    EinstellungenComponent,
    RegistrierenComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
