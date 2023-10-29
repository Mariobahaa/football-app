import { Component, OnDestroy, OnInit } from '@angular/core';
import { Fixture } from './models/fixture.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StandingsService } from '../standings/services/standings.service';
import { FixturesService } from './services/fixtures.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit, OnDestroy {
  private teamId!: number;
  public fixtures: Array<Fixture> = [];
  public loading: boolean = false;
  private subs: Subscription = new Subscription();


  constructor(private router: Router, private standingsService: StandingsService, private fixturesService: FixturesService,
    activatedRoute: ActivatedRoute, private location: Location) {
    this.teamId = activatedRoute?.snapshot?.params?.['team']; //set teamId from url
  }

  ngOnInit(): void {
    if (this.teamId) {
      this.loading = true;
      this.subs.add(this.fixturesService.getLastFixtures(this.teamId)?.subscribe({ //get last fixtures - 10 by default (changeable)
        next: this.setData, //setting fixtures to response data (cahce/api)
        error: this.onError //handle failures
      }));
    }
  }

  public goBack() {
    if (this.standingsService?.lastActiveLeague) { //if there is a last active league
      this.router.navigate(['/standings', this.standingsService?.lastActiveLeague]); //go to last opened league
    }else{
      this.location.back(); // simulate browser's back button click
    }
  }

  //set data to response value
  private setData = (data: Array<Fixture>) => {
    if (data && data.length > 0) {
      this.fixtures = [...data];
    } else {
      this.fixtures = [];
    }
    this.loading = false
  }

  //handle errors 
  private onError = (err: Error) => { this.loading = false; console.error(err); }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

}
