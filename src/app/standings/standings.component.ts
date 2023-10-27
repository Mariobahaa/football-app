import { Component, OnInit } from '@angular/core';
import { CacheService } from '../core/services/cache.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {

  constructor(private cache: CacheService){}
  ngOnInit(): void {

  }

}
