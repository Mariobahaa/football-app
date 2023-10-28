import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CacheConsumerService<T> {
  protected cacheKey = "default"; //should be set in child services
  constructor(protected cache: CacheService) { }

  //get entry from cache as an array
  protected getListFromCache(primaryProp: number, secondaryProp: number): Array<T> {
    return this.cache.get(this.constructCacheIdentifier(primaryProp?.toString(), secondaryProp?.toString()));
  }

  //save array in cache
  protected saveListInCache(primaryProp: number, secondaryProp: number, value: Array<T>) {
    this.cache.set(this.constructCacheIdentifier(primaryProp?.toString(), secondaryProp?.toString()), value);
  }

  //construct key for cache entry
  private constructCacheIdentifier = (...args: string[]) => {
    return this.cacheKey! +  (args?.length > 0? Constants.separator + args?.join(Constants.separator): "");
  }

}
