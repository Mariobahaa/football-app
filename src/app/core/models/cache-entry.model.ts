export interface CacheEntry<T> {
    data: T | Array<T>,
    expiry: number
}