import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fixture } from '../models/fixture.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixturesService {

  constructor(private http: HttpClient) { }

  public getLastFixtures(last: number): Observable<Fixture[]>{

  }

  private mapResponseToFeautres(response: any) : Array<Fixture>{
      return []
  }
}
