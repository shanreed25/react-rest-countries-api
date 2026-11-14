import type { RegionFilterProps } from "../types/countryDisplayTypes";
import { ChevronIcon } from "./Icons";

/*
A controlled select: the selected region lives in App, and this component
shows it (value) and reports changes (onChange).
*/
export function RegionFilter({ value, regions, onChange }: RegionFilterProps) {
  return (
    <label className="relative block">
      <span className="sr-only">Filter by region</span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-md bg-element-bg py-4 pr-12 pl-6 shadow-soft"
      >
        <option value="">Filter by Region</option>

        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <ChevronIcon className="pointer-events-none absolute top-1/2 right-6 size-4 -translate-y-1/2" />
    </label>
  );
}