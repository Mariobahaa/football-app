import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Standing } from '../models/standing.model';

@Component({
  selector: 'app-standings-table',
  templateUrl: './standings-table.component.html',
  styleUrls: ['./standings-table.component.scss']
})
export class StandingsTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() leagueId!: number;
  public data: Array<Standing> = [];
  // [
  //   {
  //   "rank": 1,
  //   "team": {
  //   "id": 40,
  //   "name": "Liverpool",
  //   "logo": "https://media.api-sports.io/football/teams/40.png"
  //   },
  //   "points": 70,
  //   "goalsDiff": 41,
  //   "all": {"played": 24,
  //   "win": 23,
  //   "draw": 1,
  //   "lose": 0,},
  //   }
  //   ];
  public loading = false;

  ngOnChanges(): void {
      // console.log(this.leagueId);
  }
  ngOnInit(): void {
 
  }
  

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
