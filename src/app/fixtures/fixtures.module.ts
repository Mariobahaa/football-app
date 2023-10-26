import { NgModule } from '@angular/core';

import { FixturesRoutingModule } from './fixtures-routing.module';
import { FixturesComponent } from './fixtures.component';
import { CommonModule } from '@angular/common';

const components = [
  FixturesComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FixturesRoutingModule
   
  ]
})
export class FixturesModule { }
