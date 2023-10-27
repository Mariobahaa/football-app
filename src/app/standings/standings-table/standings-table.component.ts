import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Standing } from '../models/standing.model';
import { StandingsService } from '../services/standings.service';
import { Subscription, tap } from 'rxjs';
import { mapToCanActivate } from '@angular/router';

@Component({
  selector: 'app-standings-table',
  templateUrl: './standings-table.component.html',
  styleUrls: ['./standings-table.component.scss']
})
export class StandingsTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() leagueId!: number;
  public data: Array<Standing> = [];
  // public dt = [
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
  public subs: Subscription = new Subscription();

  constructor(private standingsService: StandingsService) {
  }

  ngOnChanges(): void {
    this.loading = true;
    this.subs.add(this.standingsService.getLeagueStandingsByYear(this.leagueId).subscribe({
      next: (res: Standing[]) => {this.data = [...res];  this.loading = false;  console.log(this.data)},
      error: (err) => { console.error(err); this.loading = false },
    }));
  }


ngOnInit(): void {

}


ngOnDestroy(): void {
  throw new Error('Method not implemented.');
}

}
