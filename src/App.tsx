import { useState } from "react";
import { CountriesList } from "./components/CountriesList";
import { Layout } from "./components/Layout";
import { StatusMessage } from "./components/StatusMessage";
import { useCountries } from "./hooks/useCountries";
import { searchByName } from "./utils/countryUtils";
import { SearchInput } from "./components/SearchInput";

function App() {
  const { status, error, countries } = useCountries();
  const [searchQuery, setSearchQuery] = useState("");

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

  const countriesFound = searchByName(countries, searchQuery);

  return (
    <>
     <Layout>
        <h1>Countries</h1>
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <p> There are {countriesFound.length} countries</p>
        <CountriesList countries={countriesFound}/>
     </Layout>
    </>
  );
}

export default App;
