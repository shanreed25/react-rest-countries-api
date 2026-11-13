import type { ApiWrapperObject, ApiErrorResponse } from "../types/country";
import { ApiError } from "./ApiError";


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