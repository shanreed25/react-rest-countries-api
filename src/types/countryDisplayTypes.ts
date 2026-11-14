
import type { ReactNode } from "react";
import type { Country } from "./country";

//using children: ReactNode; so i can add anything React can render
// lik text, a heading, a button etc....
export type StatusMessageProps = {
  children: ReactNode; 
  role?: "status" | "alert";
};


//layout props
export type LayoutProps = {
  children: ReactNode;
};

export type CountriesListProps = {
  countries: Country[];
};

export type CountryCardProps = {
  country: Country;
};

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export type RegionFilterProps = {
  value: string;
  regions: string[];
  onChange: (value: string) => void;
};