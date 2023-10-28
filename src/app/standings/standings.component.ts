import { Component, OnInit } from '@angular/core';
import { CacheService } from '../core/services/cache.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from '../core/constants';
import { StandingsService } from './services/standings.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {

  
  public leagues!: Array<Object>;
  private subs: Subscription = new Subscription();
  public activeLeagueId!: number;
  constructor(private activatedRoute: ActivatedRoute, private standingsService: StandingsService) {
  }
 
  ngOnInit(): void {
    this.subs.add(this.activatedRoute.params.subscribe(params => {
      let country: string = this.standingsService.lastActiveLeague = params?.['country'] || ""; //set country and last active leage to url prama
      this.activeLeagueId =  Constants.leagues?.[country]; //get leagueId corresponding to country
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
