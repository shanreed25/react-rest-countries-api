import { useEffect, useState } from "react";
import { getAllCountries, loadCountries } from "./api/restCountriesApi";
import type {
  CountriesState,
} from "./types/country";

function App() {
  //state is a whole state shape, and can only be one of these
  // loading: { status: "loading" }
  // success: { status: "success", countries: [] }
  // error: { status: "error", error: new Error("oops") }
  const [state, setState] = useState<CountriesState>({ status: "loading" }); //loading is the starting state

  useEffect(() => {
    const controller = new AbortController();
    loadCountries(controller.signal) //returns a promise
      .then((countries) => {
        setState({
          //change loading for success and save the countries
          status: "success",
          countries: countries,//getAllCountries converts the list to Country type
        });
      })
      .catch((err: unknown) => {
        //don't show an error message for a canceled request
        if (controller.signal.aborted) {
          return;
        }


        setState({
          //change loading for error and save the Error
          status: "error",
          error: err instanceof Error ? err : new Error(String(err)), //keep if it is and Error, if not make it one
        });
      });

      return () => {controller.abort()};

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
