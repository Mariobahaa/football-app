import { Component, OnInit } from '@angular/core';
import { Fixture } from './models/fixture.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StandingsService } from '../standings/services/standings.service';
import { FixturesService } from './services/fixtures.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit {
  private teamId!: number;
  public fixtures: Array<Fixture> = [];


  constructor(private router: Router, private standingsService: StandingsService, private fixturesService: FixturesService,
    activatedRoute: ActivatedRoute) {
    this.teamId = activatedRoute.snapshot.params?.['team'];
  }

  ngOnInit(): void {
    if (this.teamId)
      this.fixturesService.getLastFixtures(this.teamId).subscribe({
        next: (data: Array<Fixture>) => this.fixtures = data,
        error: (err: Error) => { console.error(err) }
      });
  }
  public goBack() {
    this.router.navigate(['/standings', this.standingsService.lastActiveLeague]);
  }
}
