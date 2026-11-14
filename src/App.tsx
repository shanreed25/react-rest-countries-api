import { Navigate, Route, Routes } from "react-router";
import { CountriesList } from "./components/CountriesList";
import { Layout } from "./components/Layout";
import { StatusMessage } from "./components/StatusMessage";
import { useCountries } from "./hooks/useCountries";
import { useCountryFilters } from "./hooks/useCountriesFilters";
import { SearchInput } from "./components/SearchInput";
import { RegionFilter } from "./components/RegionFilter";
import { DetailsPage } from "./pages/DetailsPage";

function App() {
  const { status, error, countries } = useCountries();
  const { searchQuery, setSearchQuery, region, setRegion, regions, countriesFound } =
    useCountryFilters(countries);


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
        <Routes>

          <Route
          path="/"
          element={
            <>
              <h1>Countries</h1>
              <SearchInput value={searchQuery} onChange={setSearchQuery} />
              <RegionFilter value={region} regions={regions} onChange={setRegion}/>
              <p> There are {countriesFound.length} countries</p>
              <CountriesList countries={countriesFound} />
            </>
          }
        />

        <Route path="/country/:code" element={<DetailsPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Layout>
    </>
  );
}

export default App;
