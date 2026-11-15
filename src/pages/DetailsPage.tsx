import { useLocation, useNavigate, useParams } from "react-router";
import type { DetailsPageProps } from "../types/countryDisplayTypes";
import { getCountryById } from "../utils/countryUtils";
import { ArrowLeftIcon } from "../components/Icons";
import { styles } from "../styles/styles";
import { Flag } from "../components/Flag";

export function DetailsPage({ countries }: DetailsPageProps) {
  const { code = "" } = useParams();
  const navigate = useNavigate(); //returns a function that changes the url
  const location = useLocation(); //returns a object that describes the current url

  const country = getCountryById(countries, code);

  function handleBack() {
    //location.key is a unique id for this entry in the history
    //default is the key given when there was no previous page so the user landing on that page first
    if (location.key === "default") {
      navigate("/"); // goes to that path and adds a new history entry
    } else {
      navigate(-1); //moves back one entry in the browser history
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
      <article className={styles.detailsContainer}>
        <Flag
          key={code}
          src={country.flagPng}
          alt={`Flag for ${country.name}`}
          className="shadow-soft"
        />
        <div>
          <h1 className={styles.detailsH1}>{country.name}</h1>
          <div className={styles.countryDetails}>
            
            <dl className="space-y-4">
              <div>
                <dt className="inline font-semibold">Native Name:</dt>{" "}
                <dd className="inline">{country.nativeName || "None"}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Population:</dt>{" "}
                <dd className="inline">{country.population.toLocaleString() || "None"}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Region:</dt>{" "}
                <dd className="inline">{country.region || "None"}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Sub Region:</dt>{" "}
                <dd className="inline">{country.subregion || "None"}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Captial:</dt>{" "}
                <dd className="inline">{country.capitals.join(", ") || "None"}</dd>
              </div>
            </dl>

            <dl className="space-y-4">
              <div>
                <dt className="inline font-semibold">Top Level Domain:</dt>{" "}
                <dd className="inline">{country.tlds.join(", ") || "None"}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Currencies:</dt>{" "}
                <dd className="inline">{country.currencies.join(", ") || "None"}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Languages:</dt>{" "}
                <dd className="inline">{country.languages.join(", ") || "None"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </article>
    </>
  );
}
