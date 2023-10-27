import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingsRoutingModule } from './standings-routing.module';
import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { StandingsTableComponent } from './standings-table/standings-table.component';
import { StandingsComponent } from './standings.component';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

const components = [
  StandingsComponent,
  CountrySelectorComponent,
  StandingsTableComponent
]

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    StandingsRoutingModule,
    ButtonModule,
    ToolbarModule
   
    
  ]
})
export class StandingsModule { }
