import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/core/constants';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent implements OnInit {

  public leagues!: Array<Object>;
  private subs: Subscription = new Subscription();
  public activeLeagueId!: number;
  constructor(private activatedRoute: ActivatedRoute) {
    this.leagues = Object.keys(Constants.leagues);
  }
  ngOnInit(): void {
    this.subs.add(this.activatedRoute.params.subscribe(params => {
      let country: string = params?.['country'];
      this.activeLeagueId = Constants.leagues?.[country];
    }));
  }

  setActiveLeague(){
    
  }

}
