import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaberintoComponent } from './laberinto/laberinto.component';

const routes: Routes = [
  { path:'', component: LaberintoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
