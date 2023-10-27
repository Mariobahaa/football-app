import { Component, OnInit } from '@angular/core';
import { CacheService } from '../core/services/cache.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from '../core/constants';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {

  
  public leagues!: Array<Object>;
  private subs: Subscription = new Subscription();
  public activeLeagueId!: number;
  constructor(private activatedRoute: ActivatedRoute) {
  }
 
  ngOnInit(): void {
    this.subs.add(this.activatedRoute.params.subscribe(params => {
      let country: string = params?.['country'];
      this.activeLeagueId = Constants.leagues?.[country];
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe;
  }

}
