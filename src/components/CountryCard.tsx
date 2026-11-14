import { useState } from "react";
import type { CountryCardProps } from "../types/countryDisplayTypes";
import { countryPath } from "../utils/countryUtils";
import { Link } from "react-router";

function Flag({ src }: { src: string | null }) {
  // Remembers that this one image failed, so the placeholder replaces it
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex aspect-[33/20] w-full items-center justify-center bg-page-bg text-sm text-muted-text">
        No flag available
      </div>
    );
  }

  return (
     <img
        src={src}
        alt=""
        width={264}
        height={160}
        loading="lazy"
        onError={() => setFailed(true)} //runs when the browser cannot load the image
        className="aspect-[33/20] w-full object-cover"
      />
  )
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <article className="overflow-hidden rounded-md bg-element-bg shadow-soft">
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
            {country.population}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Capital:</span> {country.capitals}
          </p>
        </div>
      </div>
    </article>
  );
}
