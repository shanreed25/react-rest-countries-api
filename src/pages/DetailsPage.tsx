import { useParams } from "react-router";

export function DetailsPage() {
  const { code = "" } = useParams();

  return <p>Country code: {code.toUpperCase()}</p>;
}