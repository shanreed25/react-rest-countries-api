import type { CountriesListProps } from "../types/countryDisplayTypes";

/*
Countries as a list
*/
export function CountriesList({ countries }: CountriesListProps) {
  return (

    <ul role="list">
      {countries.map((country) => (
        <li key={country.code}>{country.name}</li>
      ))}
    </ul>
  );
}