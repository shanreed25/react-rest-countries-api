import type { Country, CachedCountries } from "../types/country";

const CACHE_COUNTRIES_KEY = "countries-cache";//name of the localStorage key that holds the country list

const CACHE_COUNTRIES_AGE = 24 * 60 * 60 * 1000;//the cache is good for 24 hours


/*
reads the saved countries list from localStorage
returning [] could look like the API sent back zero countries
so rteturning null is better
*/
export function readCacheCountries(): Country[] | null {
  try {
    const cachedCountriesData = localStorage.getItem(CACHE_COUNTRIES_KEY);//getItem returns a string, or null if nothing is saved
    if (!cachedCountriesData){
         return null;//return null if nothing is saved
    }

    /*
    Partial makes every property optional so each one needs to be check before using it
    */
    const parsed = JSON.parse(cachedCountriesData) as Partial<CachedCountries>;

    /*
    check save time, if it is not a number then you cannot tell how long its been so
    return null so the the app fetches from the API instead
    */
    if (typeof parsed.savedAt !== "number"){
        return null;
    }

    //check if it has been over 24 hours
    if (Date.now() - parsed.savedAt > CACHE_COUNTRIES_AGE) {
        return null;//older than 24 hours, the the app fetches from the API instead
    }

    //check to see if it is a list of countries
    if (!Array.isArray(parsed.countries)){
         return null;//the list is missing or not a list, the the app fetches from the API instead
    }

    return parsed.countries;
  } catch {
    // getItem can throw when storage is blocked
    // JSON.parse throws on broken text
    // so return null so the the app fetches from the API instead
    return null;
  }
}


/*
saves the country list to localStorage with the time it was saved
so readCache can check its age later
*/
export function writeCacheCountries(countries: Country[]): void {
  try {
    const entry: CachedCountries = { savedAt: Date.now(), countries };
    localStorage.setItem(CACHE_COUNTRIES_KEY, JSON.stringify(entry));
  } catch {
    /*
    if code reaches her the storage is full or blocked
    so the app fetches again on the next visit
    */
  }
}