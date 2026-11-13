import { useEffect, useState } from "react";
import { getCountries } from "./api/restCountriesApi";
import { convertAPICountryObject, type Country } from "./types/country";


function App() {
  const [countries, setCountries] = useState<Country[]>([]);


   useEffect(() => {
    getCountries()//returns a promise
      .then((res) => {
        const appCountries = res.data.objects.map(convertAPICountryObject)
        setCountries(appCountries);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  return (
      <>
      <h1>Countries</h1>
      <p> There are {countries.length} countries</p>
      </>
  )
}

export default App
