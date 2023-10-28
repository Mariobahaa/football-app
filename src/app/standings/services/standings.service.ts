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
    season = year ? year : this.utils.getCurrentYear();

    let standings = this.getListFromCache(leagueId, season);
    if (standings && this.utils.isNotEmptyObject(standings) && this.utils.isNotEmptyArray(standings)) {
      return of(standings);
    }
    else {
      const params = new HttpParams()
        .set('league', leagueId)
        .set('season', season);


      return (this.http.get<Array<Standing>>(Constants.baseURL + "standings", {
        headers: Constants.apiHeaders,
        params
      })).pipe(map(this.mapResponseToStandings), tap((mappedStandings: Array<Standing>) => {
        this.saveListInCache(leagueId, season, mappedStandings);
      }));
    }
  }

  private mapResponseToStandings(json: any): Array<Standing> {
    return (json?.response?.[0]?.league?.standings?.[0] || []) as Array<Standing>;
  }

 }


