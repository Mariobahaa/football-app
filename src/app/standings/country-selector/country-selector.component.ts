import { Component} from '@angular/core';
import { Constants } from 'src/app/core/constants';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent{

  public leagues!: Array<string>;
  constructor() {
    this.leagues = Object.keys(Constants.leagues) || []; //list all countries/leagues
  }
}
