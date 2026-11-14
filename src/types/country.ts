import type { ReactNode } from "react";


/* API sends back a wrapper object with the countries inside it

API Wrapper Object:
{
  "data": {
    "objects": [
      { "names": { "common": "Canada" }, "codes": { "alpha_3": "CAN" } },
      { "names": { "common": "Chile" }, "codes": { "alpha_3": "CHL" } }
    ],
    "meta": { "total": 249, "count": 2, "limit": 2, "offset": 0, "more": true }
  }
}
  */

// for { "names": { "common": "Chile" }, "codes": { "alpha_3": "CHL" } }
export type ApiCountryObject = {
  names: {
    common: string;
  };
  codes: {
    alpha_3: string;
  };
};

// For API Wrapper Object: body from GET /countries/v5
//Success Shape
export type ApiWrapperObject = {
  data: {
    //top-level key the API wraps everything in
    objects: ApiCountryObject[]; //array of countries
    meta: {
      count: number; // how many countries came back on this page
      more: boolean; // true when there are more pages after this one
    };
  };
};

//allow app components read country.name instead of country.names.common
export type Country = {
  name: string;
  code: string;
};

/* For caching the country list that gets saved in localStorage
saves the list of countries and the time it was saved
*/
export type CachedCountries = {
  savedAt: number;
  countries: Country[];
};

//the state of the app value, can only have one of three possible states
export type CountriesState =
  | { status: "loading" }
  | { status: "success"; countries: Country[] }
  | { status: "error"; error: Error };

/*
failures are wrapped in a list called errors something like:
{
  "errors": [
    {
      "message": "Invalid API key.",
      "code": "invalid_api_key"
    },
    {
      "message": "Limit must be an integer between 1 and 100.",
      "code": "general.limit_out_of_range"
    }
  ]
  But Typescript does not know what failed response shape looks like and it will be any type
  making it hard to catch mistakes,
  Need a type to tell typescript that a failed response has this shape
  failed responses can have no body so the error must be optional
*/
export type ApiErrorResponse = {
  //the errors object is oprional but the message and code are not
  //if there is and error object it must have both
  //[] makes these objects a list of objects
  errors?: { message: string; code: string }[];
};



// what the hook gives back to App
export type UseCountriesResult = {
  status: CountriesState["status"]; // "loading" | "success" | "error"
  error: Error | null; // only set when status is "error"
  countries: Country[]; // the loaded list, or EMPTY_COUNTRIES before it loads
};


//using children: ReactNode; so i can add anything React can render
// lik text, a heading, a button etc....
export type StatusMessageProps = {
  children: ReactNode; 
  role?: "status" | "alert";
};


//layout props
export type LayoutProps = {
  children: ReactNode;
};