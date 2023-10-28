import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fixture } from '../models/fixture.model';
import { Observable, map, of, tap } from 'rxjs';
import { Constants } from 'src/app/core/constants';
import { CacheService } from 'src/app/core/services/cache.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class FixturesService {
  private readonly cacheKey = "fixtures";

  constructor(private http: HttpClient, private cache: CacheService, private utils: UtilitiesService) { }

  public getLastFixtures(teamId: number, last: number = Constants.numberOfFixtures): Observable<Fixture[]> {
    let cachedData = this.getFromCache(teamId, last);
    if (cachedData && this.utils.isNotEmptyObject(cachedData) && this.utils.isNotEmptyArray(cachedData)) {
      return of(cachedData);
    }
    else {
      const params = new HttpParams()
        .set('last', last)
        .set('team', teamId);

      return this.http.get<Fixture[]>(Constants.baseURL + "fixtures", {
        headers: Constants.apiHeaders, params

      }).pipe(map(this.mapResponseToFeautres), tap((mappedFixtures: Array<Fixture>) => {
        this.saveInCache(teamId, last, mappedFixtures);
        return mappedFixtures;
      }));
    }

  }

  private mapResponseToFeautres(response: any): Array<Fixture> {
    let mappedArray = new Array<Fixture>();
    if (response) {
      response.response.forEach((fixture: any) => {
        let mappedFixture: Fixture = { teams: fixture.teams, goals: fixture.goals };
        mappedArray.push(mappedFixture);
      });
    }
    return mappedArray;
  }

  private getFromCache(teamId: number, last: number): Array<Fixture> {
    return this.cache.get(this.constructCacheIdentifier(teamId, last));
  }

  private saveInCache(teamId: number, last: number, value: Array<Fixture>) {
    this.cache.set(this.constructCacheIdentifier(teamId, last), value);
  }

  private constructCacheIdentifier = (teamId: number, last: number) => this.cacheKey + Constants.separator + teamId + Constants.separator + last;
}
