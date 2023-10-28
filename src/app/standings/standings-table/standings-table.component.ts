import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Standing } from '../models/standing.model';
import { StandingsService } from '../services/standings.service';
import { Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
@Component({
  selector: 'app-standings-table',
  templateUrl: './standings-table.component.html',
  styleUrls: ['./standings-table.component.scss']
})
export class StandingsTableComponent implements OnChanges, OnDestroy {
  @Input() leagueId!: number;
  public data: Array<Standing> = [];
  public failedToFetchData: Subject<boolean> = new Subject<boolean>();
  public loading = false;
  public subs: Subscription = new Subscription();

  constructor(private standingsService: StandingsService, private utils: UtilitiesService) {
  }

  ngOnChanges(): void {
    this.loading = true;

    this.getStandingsData();
    this.handleFailureToFetchData();
  }

  //get league standings
  private getStandingsData() {
    this.subs.add(this.standingsService.getLeagueStandingsByYear(this.leagueId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.setData(data);
        } else {
          this.failedToFetchData.next(true); //trigger failure to fetch handling
        }
      },
      error: (err) => {
        this.onError(err);
        this.failedToFetchData.next(true); //trigger failure to fetch handling
      },
    }));
  }

  //on failure to fetch data for current year try previous year since season may have not started
  private handleFailureToFetchData() {
    this.subs.add(this.failedToFetchData.asObservable().pipe(switchMap(() => {
      let year = this.utils.getCurrentYear() - 1;
      return this.standingsService.getLeagueStandingsByYear(this.leagueId, year); //fetch last year's standings
    })).subscribe({
      next: this.setData,
      error: this.onError
    }))
  }

  //set data to response value
  private setData = (data: Array<Standing>) => {
    if(data){
      this.data = [...data];
    }
    this.loading = false;
  };

  //handling errors
  private onError = (err: Error) => {
    console.error(err);
    this.loading = false
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

}
