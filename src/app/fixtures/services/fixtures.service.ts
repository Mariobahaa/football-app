import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fixture } from '../models/fixture.model';
import { Observable, map, of, tap } from 'rxjs';
import { Constants } from 'src/app/core/constants';
import { CacheConsumerService } from 'src/app/core/services/cache-consumer.service';
import { FixturesResponse } from '../models/fixtures-response.model';

@Injectable({
  providedIn: 'root'
})
export class FixturesService extends CacheConsumerService<Fixture> {

  constructor(private http: HttpClient) {
    super();
    this.cacheKey = "fixtures";
  }

  //get last N fixtures
  public getLastFixtures(teamId: number, last: number = Constants.numberOfFixtures): Observable<Array<Fixture>> {
    const cachedData: Array<Fixture> = (this.getFromCache(teamId, last) as Array<Fixture>); //get from cache
    if (cachedData &&
      (!(typeof cachedData === 'object' && Object.keys(cachedData)?.length == 0) && //not {}
        !(Array.isArray(cachedData) && cachedData?.length > 0))) { //not []
      return of(cachedData);
    }
    else { // get from http if not in cache
      const params = new HttpParams()
        .set('last', last)
        .set('team', teamId);

      return this.http.get<FixturesResponse>(Constants.baseURL + "fixtures", {
        headers: Constants.apiHeaders, params

      }).pipe(map((data: FixturesResponse) => this.mapResponseToFeautres(data)), tap((mappedFixtures: Array<Fixture>) => {
        this.saveInCache(teamId, last, mappedFixtures); //persist in cache
        return mappedFixtures;
      }));
    }

  }

  private mapResponseToFeautres(data: FixturesResponse): Array<Fixture> {
    let mappedArray = new Array<Fixture>();
    if (data) {
      data?.response?.forEach((fixture: Fixture) => {
        const mappedFixture: Fixture = { teams: fixture.teams, goals: fixture.goals };
        mappedArray.push(mappedFixture);
      });
    }
    return mappedArray;
  }

}
