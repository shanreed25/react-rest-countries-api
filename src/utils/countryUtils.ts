import type { ApiCountryObject, Country } from "../types/country";

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
    flagPng: apiCountryObject.flag?.url_png || null,//a missing flag and a blank url end up as the same value
    population: apiCountryObject.population,
    region: apiCountryObject.region,
    capitals: apiCountryObject.capitals?.map((capital) => capital.name) ?? [],//I only need the name
  };
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