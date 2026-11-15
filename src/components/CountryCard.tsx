import type { CountryCardProps } from "../types/countryDisplayTypes";
import { countryPath } from "../utils/countryUtils";
import { Link } from "react-router";
import { Flag } from "./Flag";


export function CountryCard({ country }: CountryCardProps) {
  return (
    <article className="position: relative overflow-hidden rounded-md bg-element-bg shadow-soft">
      <Flag src={country.flagPng} />

      <div className="p-6 pb-10">
        <h2 className="mb-4 text-lg font-extrabold">
            <Link to={countryPath(country)} className="after:absolute after:inset-0">
                {country.name}
            </Link>
          </h2>

        <div className="space-y-1 text-sm">
          <p>
            <span className="font-semibold">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Capital:</span> {country.capitals.join(", ")}
          </p>
        </div>
      </div>
    </article>
  );
}
