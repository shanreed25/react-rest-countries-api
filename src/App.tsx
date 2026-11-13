import { useEffect, useState } from "react";
import { getCountries } from "./api/restCountriesApi";
import type {
  Country,
  CountriesState,
} from "./types/country";
import { convertAPICountryObject } from "./utils/countryUtils";

function App() {
  //state is a whole state shape, and can only be one of these
  // loading: { status: "loading" }
  // success: { status: "success", countries: [] }
  // loading: { status: "loading", error: new Error("oops") }
  const [state, setState] = useState<CountriesState>({ status: "loading" }); //loading is the starting state

  useEffect(() => {
    getCountries() //returns a promise
      .then((res) => {
        const appCountries = res.data.objects.map(convertAPICountryObject);
        setState({
          //change loading for success and save the countries
          status: "success",
          countries: appCountries,
        });
      })
      .catch((err: unknown) => {
        setState({
          //change loading for error and save the Error
          status: "error",
          error: err instanceof Error ? err : new Error(String(err)), //kepp if it is and Error, if not make it one
        });
      });
  }, []);

  if (state.status === "loading") {
    return <p>Loading countries...</p>;
  }

  if (state.status === "error") {
    return <p>Error: {state.error.message}</p>;
  }

  return (
    <>
      <h1>Countries</h1>
      <p> There are {state.countries.length} countries</p>
    </>
  );
}

export default App;
