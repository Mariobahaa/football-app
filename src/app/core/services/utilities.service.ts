import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  public getCurrentYear(){
    return new Date().getFullYear();
  }

  public isNotEmptyObject(value: any): boolean {
    return typeof value === 'object' && Object.keys(value).length > 0;
  }

  public isNotEmptyArray(value: any): boolean {
    return Array.isArray(value) && value.length > 0;
  }
  
}
