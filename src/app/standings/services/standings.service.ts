import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/core/constants';
import { Standing } from '../models/standing.model';
import { Observable, map, of, tap } from 'rxjs';
import { CacheConsumerService } from 'src/app/core/services/cache-consumer.service';
import { StandingsResponse } from '../models/standings-response.model';

@Injectable({
  providedIn: 'root'
})
export class StandingsService extends CacheConsumerService<Standing> {

  private _lastActiveLeague: string = Constants.defaultLeague;

  public get lastActiveLeague(): string {
    return this._lastActiveLeague;
  }
  public set lastActiveLeague(value: string) {
    this._lastActiveLeague = value;
  }
  constructor(private http: HttpClient) {
    super();
    this.cacheKey = "standings"
  }

  getLeagueStandingsByYear(leagueId: number, year?: number): Observable<Array<Standing>> {
    let season: number;
    season = year ? year : new Date().getFullYear(); //if year is not specified set as current year

    const cachedData: Array<Standing> = (this.getFromCache(leagueId, season) as Array<Standing>); //get from cache
    if (cachedData &&
      (!(typeof cachedData === 'object' && Object.keys(cachedData)?.length == 0) && //not {}
        !(Array.isArray(cachedData) && cachedData?.length > 0))) {
      return of(cachedData);
    }
    else { // get from http if not in cache
      const params = new HttpParams()
        .set('league', leagueId)
        .set('season', season);


      return (this.http.get<StandingsResponse>(Constants.baseURL + "standings", {
        headers: Constants.apiHeaders,
        params
      }))?.pipe(map((data: StandingsResponse) => this.mapResponseToStandings(data)), tap((mappedStandings: Array<Standing>) => {
        this.saveInCache(leagueId, season, mappedStandings); //persist in cache
      }));
    }
  }

  //map api response to app model
  private mapResponseToStandings(json: StandingsResponse): Array<Standing> { 
    let mappedStandingsList: Array<Standing> = new Array<Standing>()

    const standingsList = json?.response?.[0]?.league?.standings?.[0];
    standingsList?.forEach((standing: Standing) => {
      let mappedStanding: Standing;
      mappedStanding = {
        rank: standing.rank,
        team: { id: standing?.team?.id, name: standing?.team?.name, logo: standing?.team?.logo },
        all: { played: standing?.all?.played, win: standing?.all?.win, lose: standing?.all?.lose, draw: standing?.all?.draw },
        goalsDiff: standing.goalsDiff,
        points: standing.points
      };
      mappedStandingsList?.push(mappedStanding);
    })
    return mappedStandingsList;
  }

}


