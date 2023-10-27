import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/core/constants';
import { Standing } from '../models/standing.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  constructor(private http: HttpClient) { }

  getLeagueStandingsByYear(leagueId: number, year?: number): Observable<Standing[]> {
    let season: number;
    if (!year) {
      season = new Date().getFullYear();
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


function delay(arg0: number): import("rxjs").OperatorFunction<Standing[], unknown> {
  throw new Error('Function not implemented.');
}

function take(arg0: number): import("rxjs").OperatorFunction<unknown, any> {
  throw new Error('Function not implemented.');
}

