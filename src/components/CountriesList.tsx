import { styles } from "../styles/styles";
import type { CountriesListProps } from "../types/countryDisplayTypes";
import { CountryCard } from "./CountryCard";

/*
Countries as a list
*/
export function CountriesList({ countries }: CountriesListProps) {
  return (

    <ul role="list" className={styles.countriesList}>
      {countries.map((country) => (
        <li key={country.code || country.name}>
          <CountryCard country={country}/>
          </li>
      ))}
    </ul>
  );
}