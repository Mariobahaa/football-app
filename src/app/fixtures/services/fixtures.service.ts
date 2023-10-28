import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fixture } from '../models/fixture.model';
import { Observable, map, of, tap } from 'rxjs';
import { Constants } from 'src/app/core/constants';
import { CacheService } from 'src/app/core/services/cache.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
import { CacheConsumerService } from 'src/app/core/services/cache-consumer.service';

@Injectable({
  providedIn: 'root'
})
export class FixturesService extends CacheConsumerService<Fixture> {

  constructor(private http: HttpClient, cache: CacheService, private utils: UtilitiesService) {
    super(cache);
    this.cacheKey = "fixtures";
  }

  //get last N fixtures
  public getLastFixtures(teamId: number, last: number = Constants.numberOfFixtures): Observable<Fixture[]> {
    const cachedData = this.getListFromCache(teamId, last); //get from cache
    if (cachedData && this.utils.isNotEmptyObject(cachedData) && this.utils.isNotEmptyArray(cachedData)) {
      return of(cachedData);
    }
    else { // get from http if not in cache
      const params = new HttpParams()
        .set('last', last)
        .set('team', teamId);

      return this.http.get<Fixture[]>(Constants.baseURL + "fixtures", {
        headers: Constants.apiHeaders, params

      }).pipe(map(this.mapResponseToFeautres), tap((mappedFixtures: Array<Fixture>) => {
        this.saveListInCache(teamId, last, mappedFixtures); //persist in cache
        return mappedFixtures;
      }));
    }

  }

  private mapResponseToFeautres(data: any): Array<Fixture> {
    let mappedArray = new Array<Fixture>();
    if (data) {
      data?.response?.forEach((fixture: any) => {
        const mappedFixture: Fixture = { teams: fixture.teams, goals: fixture.goals };
        mappedArray.push(mappedFixture);
      });
    }
    return mappedArray;
  }

}
