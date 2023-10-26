import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  constructor(private http: HttpClient) { }

  readonly headers = {
      'x-rapidapi-host': Constants.host,
      'x-rapidapi-key': Constants.baseURL
  }
  getLeagueStandingsByCountry(country: string){
      //this.http.get
  }
}
