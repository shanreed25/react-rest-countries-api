import { useEffect, useState } from "react";
import { getAllCountries, loadCountries } from "./api/restCountriesApi";
import type {CountriesState,} from "./types/country";
import { useCountries } from "./hooks/useCountries";

function App() {
  const { status, error, countries } = useCountries();

  if (status === "loading") {
    return <p>Loading countries...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <>
      <h1>Countries</h1>
      <p> There are {countries.length} countries</p>
    </>
  );
}

export default App;
