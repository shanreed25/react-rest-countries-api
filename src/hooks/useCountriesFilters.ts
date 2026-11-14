import { useMemo, useState } from "react";
import type { Country } from "../types/country";
import type { UseCountryFiltersResult } from "../types/countryDisplayTypes";
import {
  filterByRegion,
  getRegions,
  searchByName,
} from "../utils/countryUtils";


export function useCountryFilters(countries: Country[]): UseCountryFiltersResult {
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("");

  const regions = useMemo(() => getRegions(countries), [countries]);

  const countriesFound = useMemo(
    () => searchByName(filterByRegion(countries, region), searchQuery),
    [countries, region, searchQuery],
  );

  return { searchQuery, setSearchQuery, region, setRegion, regions, countriesFound };
}