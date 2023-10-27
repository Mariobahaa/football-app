import { Component } from '@angular/core';
import { Fixture } from './models/fixture.model';
import { Router } from '@angular/router';
import { StandingsService } from '../standings/services/standings.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent {
  public fixtures: Array<Fixture> = [{
    teams: {
      home: {
        id: 967,
        name: "Rapide Oued ZEM",
        logo: "https://media.api-sports.io/football/teams/967.png",

      },
      away: {
        id: 968,
        name: "Wydad AC",
        logo: "https://media.api-sports.io/football/teams/968.png",
      }
    },
    goals: {
      home: 0,
      away: 1
    },
  },
  {
    teams: {
      home: {
        id: 967,
        name: "Rapide Oued ZEM",
        logo: "https://media.api-sports.io/football/teams/967.png",

      },
      away: {
        id: 968,
        name: "Wydad AC",
        logo: "https://media.api-sports.io/football/teams/968.png",
      }
    },
    goals: {
      home: 0,
      away: 1
    },
  }

  ];

  constructor(private router: Router, private standingsService: StandingsService) { }

  public goBack() {
    this.router.navigate(['/standings',  this.standingsService.lastActiveLeague]);
  }
}
