import { useLocation, useNavigate, useParams } from "react-router";
import type { DetailsPageProps } from "../types/countryDisplayTypes";
import { getCountryById } from "../utils/countryUtils";
import { ArrowLeftIcon } from "../components/Icons";
import { styles } from "../styles/styles";
import { Flag } from "../components/Flag";

export function DetailsPage({ countries }: DetailsPageProps) {
  const { code = "" } = useParams();
  const navigate = useNavigate();//returns a function that changes the url
  const location = useLocation();//returns a object that describes the current url


  const country = getCountryById(countries, code);

  function handleBack() {
    //location.key is a unique id for this entry in the history
    //default is the key given when there was no previous page so the user landing on that page first 
    if (location.key === "default") {
      navigate("/");// goes to that path and adds a new history entry
    } else {
      navigate(-1);//moves back one entry in the browser history
    }
  }

  if (!country) {
    return <p>No country found for "{code}"</p>;
  }

  return (
    <>
    <button type="button" onClick={handleBack} className={styles.backButton}>
        <ArrowLeftIcon className="size-5" />
        Back
      </button>
      <article className={styles.detailsGrid}>
        <Flag key={code} src={country.flagPng} alt={`Flag for ${country.name}`} className="shadow-soft" />
        <h1>{country.name}</h1>
        <pre>{JSON.stringify(country, null, 2)}</pre>
      </article>
    </>
  );
}
