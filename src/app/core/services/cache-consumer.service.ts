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
    return this.cache.get(this.constructCacheIdentifier(primaryProp?.toString(), secondaryProp?.toString()));
  }

  protected saveListInCache(primaryProp: number, secondaryProp: number, value: Array<T>) {
    this.cache.set(this.constructCacheIdentifier(primaryProp?.toString(), secondaryProp?.toString()), value);
  }

  private constructCacheIdentifier = (...args: string[]) => {
    return this.cacheKey! +  (args?.length > 0? Constants.separator + args?.join(Constants.separator): "");
  }

}
