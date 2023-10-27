import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-standings-table',
  templateUrl: './standings-table.component.html',
  styleUrls: ['./standings-table.component.scss']
})
export class StandingsTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() leagueId!: number;


  ngOnChanges(): void {
      console.log(this.leagueId);
  }
  ngOnInit(): void {
 
  }
  

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
