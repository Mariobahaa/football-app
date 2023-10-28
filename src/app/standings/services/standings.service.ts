import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/core/constants';
import { Standing } from '../models/standing.model';
import { Observable, map, of, tap } from 'rxjs';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
import { CacheService } from 'src/app/core/services/cache.service';
import { CacheConsumerService } from 'src/app/core/services/cache-consumer.service';

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
  constructor(private http: HttpClient, cache: CacheService, private utils: UtilitiesService) {
    super(cache);
    this.cacheKey = "standings"
  }

  getLeagueStandingsByYear(leagueId: number, year?: number): Observable<Standing[]> {
    let season: number;
    season = year ? year : this.utils.getCurrentYear(); //if year is not specified set as current year

    const standings = this.getListFromCache(leagueId, season); //get from cache
    if (standings && this.utils.isNotEmptyObject(standings) && this.utils.isNotEmptyArray(standings)) {
      return of(standings);
    }
    else { // get from http if not in cache
      const params = new HttpParams()
        .set('league', leagueId)
        .set('season', season);


      return (this.http.get<Array<Standing>>(Constants.baseURL + "standings", {
        headers: Constants.apiHeaders,
        params
      })).pipe(map(this.mapResponseToStandings), tap((mappedStandings: Array<Standing>) => {
        this.saveListInCache(leagueId, season, mappedStandings); //persist in cache
      }));
    }
  }

  //map api response to app model
  private mapResponseToStandings(json: any): Array<Standing> { 
    let mappedStandingsList: Array<Standing> = new Array<Standing>()

    const standingsList = json?.response?.[0]?.league?.standings?.[0];
    standingsList.forEach((standing: Standing) => {
      let mappedStanding: Standing;
      mappedStanding = {
        rank: standing.rank,
        team: { id: standing?.team?.id, name: standing?.team?.name, logo: standing?.team?.logo },
        all: { played: standing?.all?.played, win: standing?.all?.win, lose: standing?.all?.lose, draw: standing?.all?.draw },
        goalsDiff: standing.goalsDiff,
        points: standing.points
      };
      mappedStandingsList.push(mappedStanding);
    })
    return mappedStandingsList;
  }

}


