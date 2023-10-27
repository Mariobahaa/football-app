import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fixture } from '../models/fixture.model';
import { Observable, map } from 'rxjs';
import { Constants } from 'src/app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class FixturesService {

  constructor(private http: HttpClient) { }

  public getLastFixtures(teamId: number, last: number = Constants.numberOfFixtures): Observable<Fixture[]>{

    const params = new HttpParams()
    .set('last', last)
    .set('team', teamId);

    return  this.http.get<Fixture[]>(Constants.baseURL+"fixtures", {
        headers: Constants.apiHeaders, params

      }).pipe(map(this.mapResponseToFeautres));
  }

  private mapResponseToFeautres(response: any) : Array<Fixture>{
      let mappedArray = new Array<Fixture>();
      if(response){
        response.response.forEach((fixture: any) => {
          let mappedFixture: Fixture = {teams: fixture.teams, goals: fixture.goals};
          mappedArray.push(mappedFixture);
        });
      }
      return mappedArray;
  }
}
