import   { Link } from "react-router";
import "./NotFound.css"
export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Vous ete perdu </h1>
      <p>
         vous pouver sortir par <Link to="/">Là</Link>.
      </p>
    </div>
  );
}