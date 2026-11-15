import { styles } from "../styles/styles";
import type { CountriesListProps } from "../types/countryDisplayTypes";
import { getCountryId } from "../utils/countryUtils";
import { CountryCard } from "./CountryCard";

/*
Countries as a list
*/
export function CountriesList({ countries }: CountriesListProps) {
  return (

    <ul role="list" className={styles.countriesList}>
      {countries.map((country) => (
        <li key={getCountryId(country)}>
          <CountryCard country={country}/>
          </li>
      ))}
    </ul>
  );
}