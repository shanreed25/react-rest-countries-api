import { useMemo, useState } from "react";
import { CountriesList } from "./components/CountriesList";
import { Layout } from "./components/Layout";
import { StatusMessage } from "./components/StatusMessage";
import { useCountries } from "./hooks/useCountries";
import { searchByName, filterByRegion, getRegions } from "./utils/countryUtils";
import { SearchInput } from "./components/SearchInput";
import { RegionFilter } from "./components/RegionFilter";

function App() {
  const { status, error, countries } = useCountries();
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("");
  const regions = useMemo(() => getRegions(countries), [countries]); //so countries are not look through on every keystroke

  const countriesFound = useMemo(
    () => searchByName(filterByRegion(countries, region), searchQuery),
    [countries, region, searchQuery],
  );

  if (status === "loading") {
    return (
      <Layout>
        <StatusMessage>Loading countries.....</StatusMessage>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <StatusMessage role="alert">Error: {error.message}</StatusMessage>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <h1>Countries</h1>
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <RegionFilter value={region} regions={regions} onChange={setRegion}/>
        <p> There are {countriesFound.length} countries</p>
        <CountriesList countries={countriesFound} />
      </Layout>
    </>
  );
}

export default App;
