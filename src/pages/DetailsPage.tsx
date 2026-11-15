import { useParams } from "react-router";
import type { DetailsPageProps } from "../types/countryDisplayTypes";
import { getCountryById } from "../utils/countryUtils";

export function DetailsPage({ countries }: DetailsPageProps) {
  const { code = "" } = useParams();
  const country = getCountryById(countries, code);

  if (!country) {
    return <p>No country found for "{code}"</p>;
  }

  return (
    <article>
      <h1>{country.name}</h1>
      <pre>{JSON.stringify(country, null, 2)}</pre>
    </article>
  );
}
