import { Injectable } from '@angular/core';
import { CacheEntry } from '../models/cache-entry.model';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private localStorageKey = 'football'; 

  set(key: string, value: any, expirationMs: number = 3600000) { //setting default expiry to 1 hour
    const cacheData = this.getCacheData();
    const expiry = expirationMs > 0 ? Date.now() + expirationMs : 0;
    cacheData[key] = { data: value, expiry };
    this.setCacheData(cacheData);
  }

  get(key: string): any{
    const cacheData = this.getCacheData();
    if (!cacheData[key]) {
      return null;
    }
    const entry: CacheEntry = cacheData[key];
    if (entry.expiry === 0 || entry.expiry >= Date.now()) {
      return entry.data;
    } else {
      this.remove(key);
      return null; // Cache entry has expired
    }
  }

  remove(key: string) {
    const cacheData = this.getCacheData();
    delete cacheData[key];
    this.setCacheData(cacheData);
  }

  private getCacheData(): { [key: string]: CacheEntry } {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : {};
  }

  private setCacheData(cacheData: { [key: string]: CacheEntry }) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cacheData));
  }
}