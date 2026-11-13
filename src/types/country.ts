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
export type ApiWrapperObject = {
  data: {//top-level key the API wraps everything in
    objects: ApiCountryObject[];//array of countries
  };
};


//allow app components read country.name instead of country.names.common
export type Country = {
  name: string;
  code: string;
};

/*
turn the ApiCountryObject into the shape of the Country type
From: { names: { common: "Canada" }, codes: { alpha_3: "CAN" } }
To: { name: "Canada", code: "CAN" }
Test in App.tsx: getCountries().then((response) => {
  console.log(response.data.objects.map(convertAPICountryObject));//Pass the function itself, without parentheses. map calls it once per item
});
results should be an array of 100 flat objects like { name: "Afghanistan", code: "AFG" }
*/
export function convertAPICountryObject(apiCountryObject: ApiCountryObject): Country {
  return {
    name: apiCountryObject.names.common,
    code: apiCountryObject.codes.alpha_3,
  };
}