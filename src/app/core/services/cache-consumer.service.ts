import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { CacheEntry } from '../models/cache-entry.model';

@Injectable({
  providedIn: 'root'
})
export class CacheConsumerService<T> {
  protected cacheKey = "default"; //should be set in child services
  private localStorageKey = 'football'; 

  constructor() { }

  //get entry from cache as an array
  protected getFromCache(primaryProp: number, secondaryProp: number): T | Array<T> | null {
    return this.get(this.constructCacheIdentifier(primaryProp?.toString(), secondaryProp?.toString()));
  } 

  //save array in cache
  protected saveInCache(primaryProp: number, secondaryProp: number, value: T | Array<T>) {
    this.set(this.constructCacheIdentifier(primaryProp?.toString(), secondaryProp?.toString()), value);
  }

  //construct key for cache entry
  protected constructCacheIdentifier = (...args: string[]) => {
    return this.cacheKey! +  (args?.length > 0? Constants.separator + args?.join(Constants.separator): "");
  }


  //basic cahching logic 
  private get(key: string): T | Array<T> | null{
    const cacheData = this.getCacheData();
    if (!cacheData[key]) { //entry not available in cache
      return null;
    }
    const entry: CacheEntry<T> = cacheData[key];
    if (entry.expiry === 0 || entry.expiry >= Date.now()) {
      return entry.data;
    } else {
      this.remove(key); //remove expired entry
      return null; //cache entry has expired
    }
  }

  private set(key: string, value: T | Array<T>, expirationMs: number = 3600000) { //setting default expiry to 1 hour
    const cacheData = this.getCacheData();
    const expiry = expirationMs > 0 ? Date.now() + expirationMs : 0;
    cacheData[key] = { data: value, expiry };
    this.setCacheData(cacheData);
  }

  //remove entry from storage
  private remove(key: string) {
    const cacheData = this.getCacheData();
    delete cacheData[key];
    this.setCacheData(cacheData);
  }

  private getCacheData(): { [key: string]: CacheEntry<T> } {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : {};
  }

  private setCacheData(cacheData: { [key: string]: CacheEntry<T> }) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cacheData));
  }

}
