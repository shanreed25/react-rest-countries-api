import { styles } from "../styles/styles";
import type { SearchInputProps } from "../types/countryDisplayTypes";
import { SearchIcon } from "./Icons";

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label className="relative block">
      <span className="sr-only">Search for a country</span>
      <SearchIcon className={styles.searchIcon} />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for a country..."
        className={styles.searchInput}
      />
    </label>
  );
}