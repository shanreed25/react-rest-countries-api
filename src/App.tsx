import { CountriesList } from "./components/CountriesList";
import { Layout } from "./components/Layout";
import { StatusMessage } from "./components/StatusMessage";
import { useCountries } from "./hooks/useCountries";

function App() {
  const { status, error, countries } = useCountries();

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
        <p> There are {countries.length} countries</p>
        <CountriesList countries={countries}/>
     </Layout>
    </>
  );
}

export default App;
