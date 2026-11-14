import type { CountriesListProps } from "../types/countryDisplayTypes";
import { CountryCard } from "./CountryCard";

/*
Countries as a list
*/
export function CountriesList({ countries }: CountriesListProps) {
  return (

    <ul role="list">
      {countries.map((country) => (
        <li key={country.code}>
          <CountryCard country={country}/>
          </li>
      ))}
    </ul>
  );
}