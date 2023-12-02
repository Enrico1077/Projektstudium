import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuftragshistorieComponent } from './auftragshistorie/auftragshistorie.component';


const routes: Routes = [
  {
    path: 'auftragshistorie', component: AuftragshistorieComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
