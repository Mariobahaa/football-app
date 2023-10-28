import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/core/constants';
import { Standing } from '../models/standing.model';
import { Observable, map } from 'rxjs';
import { UtilitiesService } from 'src/app/core/services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  private _lastActiveLeague: string = Constants.defaultLeague;
  
  public get lastActiveLeague(): string {
    return this._lastActiveLeague;
  }
  public set lastActiveLeague(value: string) {
    this._lastActiveLeague = value;
  }
  constructor(private http: HttpClient, private utils: UtilitiesService) { }

  getLeagueStandingsByYear(leagueId: number, year?: number): Observable<Standing[]> {
    let season: number;
    if (!year) {
      season = this.utils.getCurrentYear();
    } else {
      season = year;
    }
    const params = new HttpParams()
      .set('league', leagueId)
      .set('season', season);


    return (this.http.get<Standing[]>(Constants.baseURL + "standings", {
      headers: Constants.apiHeaders,
      params
    })).pipe(map(this.mapResponseToStandings));
  }
  
  private mapResponseToStandings(json: any): Array<Standing> {
    return (json?.response?.[0]?.league?.standings?.[0] || [])as Array<Standing>;
  }

}

