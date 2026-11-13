import type { ApiWrapperObject } from "../types/country";


/*
import.meta.env is the  built-in way to get the value
from the .env file
*/
const { VITE_RESTCOUNTRIES_API_KEY } = import.meta.env;

export const RESPONSE_FIELDS = ["names.common", "codes.alpha_3"];//fields i need back, this match the ApiCountryObject type
export const BASE_URL = "https://api.restcountries.com/countries/v5";//endpoint
export const PAGE_SIZE = 100;//for limit 100 is the free plan maximum, to from keep from hitting the 400 Bad Request error

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
Send the request with the key
needs to wait for request
return a promise of the ApiWrapperObject type
*/
export async function getCountries(offset = 0): Promise<ApiWrapperObject> {
  const apiKey = VITE_RESTCOUNTRIES_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_RESTCOUNTRIES_API_KEY in .env.local");
  }

  /*
  with each request it need an API Key 
  */
  const response = await fetch(createCountriesUrl(offset), {
    headers: { //using headers is safer
        Authorization: `Bearer ${apiKey}` 
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}