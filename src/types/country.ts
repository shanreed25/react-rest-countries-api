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

