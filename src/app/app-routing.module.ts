import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from './core/constants';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `standings/${Constants.defaultLeague}`
  },

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
