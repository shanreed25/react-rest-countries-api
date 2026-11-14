import type { ApiWrapperObject, ApiErrorResponse, Country, ApiCountryObject } from "../types/country";
import { readCacheCountries, writeCacheCountries } from "../utils/cacheUtils";
import { convertAPICountryObject } from "../utils/countryUtils";
import { ApiError } from "./ApiError";


/*
import.meta.env is the  built-in way to get the value
from the .env file
*/
const { VITE_RESTCOUNTRIES_API_KEY } = import.meta.env;

export const RESPONSE_FIELDS = [
  "names.common",
  "codes.alpha_3",
  "flag.url_png",
  "population",
  "region",
  "capitals",
];//fields i need back, this match the ApiCountryObject type
export const BASE_URL = "https://api.restcountries.com/countries/v5";//endpoint
export const PAGE_SIZE = 100;//for limit 100 is the free plan maximum, to from keep from hitting the 400 Bad Request error
const MAX_PAGES = 10;

//Builds the request URL
export function createCountriesUrl(offset = 0): string {
    /*
    URLSearchParams turns the object into a query
    string: limit=100&offset=0
    it only accepts strings so the numbers need to be converted
    */
  const params = new URLSearchParams({
    response_fields: RESPONSE_FIELDS.join(","),//response_fields need to be one comma-separated string
    limit: String(PAGE_SIZE),
    offset: String(offset),//where to start, 0 is the first country
  });

  //returns something like: https://api.restcountries.com/countries/v5?response_fields=names.common%2Ccodes.alpha_3&limit=100&offset=0
  return `${BASE_URL}?${params}`;
}


/*
Turns a failed response into an ApiError so I 
have a message that says what to fix
*/

async function createApiError(res: Response): Promise<ApiError> {
  let apiMessage: string | undefined;

  try {
    const body = (await res.json()) as ApiErrorResponse;
    apiMessage = body.errors?.[0]?.message; // first message in the errors list, if there is one
  } catch {
    // the apiMessage is still undefined
    // an empty catch does nothing so the code moves to the switch
  }

  switch (res.status) {
    case 401:
      return new ApiError("API Key rejected.", 401);
    case 403:
      return new ApiError("Your monthly request limit has been reached.", 403);
    case 429:
      return new ApiError("Too many requests, Try again later.", 429);
    default:
      // if anything else use the API's message, or `The API returned an erro....`
      return new ApiError(
        apiMessage ?? `The API returned an error (status ${res.status}).`,
        res.status,
      );
  }
}


/*
Send the request with the key
needs to wait for request
return a promise of the ApiWrapperObject type
```
 Can test in App.tsx with: getCountries().then((response) => console.log(response));
 the response is an an object...{data: {…}} data.objects is an array that holds 100 country objects
```
*/
export async function getCountries(offset = 0, signal?:AbortSignal): Promise<ApiWrapperObject> {
    
  const apiKey = VITE_RESTCOUNTRIES_API_KEY;

  if (!apiKey) {
    throw new ApiError("Missing VITE_RESTCOUNTRIES_API_KEY in .env.local", 0);//using 0 because the server never answered, so there’s no real status
  }

  // I nned to acces response after try/catch
  let response: Response;//when you call fetch, the browser gives back a Response object same object as response.ok, response.status etc...


  /*
  with each request it need an API Key 
  */
 try{
  response = await fetch(createCountriesUrl(offset), {
    headers: { //using headers is safer
        Authorization: `Bearer ${apiKey}` 
    },
    signal: signal,//fetch watches this and stops the request when abort() is called
  });
} catch(err) {
  // if  abort() is called, this will throw the same error again and the useEffect will ignore it
  if(signal?.aborted){
    throw err
  }

  //there is no response at all because no internet or browser blocked request
   throw new ApiError("Could not reach the API. Check your internet connection and that this site's hostname is on your API key's allowed list.", 0)
}

  if (!response.ok) {//there is an error that the server responed with
    throw await createApiError(response);//create a clear error message
  }

  return response.json();
}


//gets every page of countries, one request after another
export async function getAllCountries(signal?: AbortSignal): Promise<Country[]> {
  const allCountries: ApiCountryObject[] = [];
  let offset = 0;

  /*
  free plan only allows a max of 100 countries per request
  so to get all 250 countries I would need at least 3 requests
  this loop keeps going until the API says there are no more pages
  so the code will still work if the number of countries changes
  starts at page 1: let page = 0;
  set a limit so the loop will send 10 request at the most in the case where
  more: false never comes back
  */

  for (let page = 0; page < MAX_PAGES; page++) {

    const res = await getCountries(offset, signal);//wait for one page from getCountries, each request waits for the one before it
    
    const { objects, meta } = res.data;//get the countries and the meta info

    allCountries.push(...objects)

    //when the API says there are no more pages stop loop
    if (!meta.more || objects.length === 0) {
      break;
    }

   // move offset forward by meta.count
   offset += meta.count;
  }

  // convert to the Country shape
  return allCountries.map(convertAPICountryObject);
}


/*
function the app calls to get the countries
get the countries from ses the cached list in localStorage
or loads every page from the API and saves the list for next time
*/
export async function loadCountries(signal?: AbortSignal): Promise<Country[]> {
  const cached = readCacheCountries();
  if (cached) {
    return cached;//cached countries
  }

  //if no cached countries or it is too old

  //get countries from api
  const countries = await getAllCountries(signal);

  //if getAllCountries throws an error, aborts etc... nothing gets save

  //only runs if every page loaded
  writeCacheCountries(countries);

  return countries;
}