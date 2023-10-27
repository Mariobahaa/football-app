import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Standing } from '../models/standing.model';
import { StandingsService } from '../services/standings.service';
import { Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
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

  constructor(private standingsService: StandingsService) {
  }

  ngOnChanges(): void {
    this.loading = true;

    this.getStandingsData();
    this.handleFailureToFetchData();
  }


  private getStandingsData() {
    this.subs.add(this.standingsService.getLeagueStandingsByYear(this.leagueId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.setData(data);
        } else {
          this.failedToFetchData.next(true);
        }
      },
      error: (err) => {
        this.onError(err);
        this.failedToFetchData.next(true);
      },
    }));
  }

  private handleFailureToFetchData() {
    this.subs.add(this.failedToFetchData.asObservable().pipe(switchMap(() => {
      let year = new Date().getFullYear() - 1;
      return this.standingsService.getLeagueStandingsByYear(this.leagueId, year);
    })).subscribe({
      next: this.setData,
      error: this.onError
    }))
  }

  private setData = (res: Standing[]) => {
    this.data = [...res];
    this.loading = false;
    console.log(this.data)
  };
  private onError = (err: Error) => {
    console.error(err);
    this.loading = false
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
