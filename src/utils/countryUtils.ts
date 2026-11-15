import type { ApiCountryObject, Country } from "../types/country";

/*
turn the ApiCountryObject into the shape of the Country type
From: { "names": { "common": "Canada", "native": {...} }, "codes": { "alpha_3": "CAN" } "flag": { "url_png": "...." },
        "population": ....,
        "region": "...",
        "subregion": "...",
        "capitals": [{ .... }],
        "tlds": ["..."],
        "currencies": [{ "code": "...", "name": "...", "symbol": "..." }],
        "languages": [{ "name": "..." }, { "name": "..." }, { "name": "..." }],
        "borders": ["...", "...", "...", "..."]},
      .....more coutries
    }
To: {
  name: "...",
  nativeName: "...",
  code: "...",
  flagPng: "...",
  population: ...,
  region: "...",
  subregion: "...",
  capitals: ["..."],
  tlds: ["..."],
  currencies: ["..."],
  languages: ["...", "...", "..."],
  borders: ["...", "...", "...", "..."]
}
*/
export function convertAPICountryObject(apiCountryObject: ApiCountryObject): Country {
  return {
    name: apiCountryObject.names.common,
    code: apiCountryObject.codes.alpha_3,
    flagPng: apiCountryObject.flag?.url_png || null,//a missing flag and a blank url end up as the same value
    population: apiCountryObject.population,
    region: apiCountryObject.region,
    capitals: apiCountryObject.capitals?.map((capital) => capital.name) ?? [],//I only need the name
    nativeName: apiCountryObject.names.common,
    subregion: apiCountryObject.subregion ?? "",
    tlds: apiCountryObject.tlds ?? [],//it is an array of strings but a missing value needs replacing
    currencies: apiCountryObject.currencies?.map((currency) => currency.name) ?? [],
    languages: apiCountryObject.languages?.map((language) => language.name) ?? [],
    borders: apiCountryObject.borders ?? [],
  };
}

export function getCountryById(countries: Country[], id: string): Country | undefined {
  const countryId = id.toLowerCase();

  const countryFound = countries.find((country) => getCountryId(country).toLowerCase() === countryId)

  return countryFound
}

//returns the countries whose name contains the search text
export function searchByName(countries: Country[], query: string): Country[] {
  const searchText = query.trim().toLowerCase();

  if (searchText === "") {
    return countries;
  }

  return countries.filter((country) =>
    country.name.toLowerCase().includes(searchText),
  );
}


export function getRegions(countries: Country[]): string[] {
  const regions = new Set(
    countries.map((country) => country.region).filter((region) => region !== ""),
  );

  return Array.from(regions).sort((a, b) => a.localeCompare(b));
}

// gets the countries in one region
export function filterByRegion(
  countries: Country[],
  region: string,
): Country[] {
  if (region === "") {//empty region means "all"
    return countries;
  }

  return countries.filter((country) => country.region === region);
}


export function getCountryId(country: Country): string {
  return country.code || country.name;
}

export function countryPath(country: Country): string {
  return `/country/${getCountryId(country)}`;
}


export function getBorderCountries(countries: Country[], borderCodes: string[]): Country[] {
  return borderCodes
    .map((code) => getCountryById(countries, code))//gives a country or undefined
    .filter((country): country is Country => country !== undefined)//remove undefined
}