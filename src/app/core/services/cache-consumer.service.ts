import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CacheConsumerService<T> {
  protected cacheKey = "default"; //override
  constructor(protected cache: CacheService) { }

  protected getListFromCache(primaryProp: number, secondaryProp: number): Array<T> {
    return this.cache.get(this.constructCacheIdentifier(primaryProp, secondaryProp));
  }

  protected saveListInCache(primaryProp: number, secondaryProp: number, value: Array<T>) {
    this.cache.set(this.constructCacheIdentifier(primaryProp, secondaryProp), value);
  }

  private constructCacheIdentifier = (primaryProp: number, secondaryProp: number) => {
    return this.cacheKey! + (primaryProp ? (Constants.separator + primaryProp + (secondaryProp ? Constants.separator + secondaryProp : "")) : "");
  }

}
