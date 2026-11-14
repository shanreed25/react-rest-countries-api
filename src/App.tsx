import { StatusMessage } from "./components/StatusMessage";
import { useCountries } from "./hooks/useCountries";

function App() {
  const { status, error, countries } = useCountries();

  if (status === "loading") {
    return <StatusMessage>Loading countries.....</StatusMessage>
  }

  if (error) {
    <StatusMessage role="alert">Error: {error.message}</StatusMessage>;
  }


  return (
    <>
      <h1>Countries</h1>
      <p> There are {countries.length} countries</p>
    </>
  );
}

export default App;
