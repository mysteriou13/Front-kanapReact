import { useNavigate } from "react-router";
import "./Deconnection.css"
import { useEffect, useState } from "react";

export default function Deconnection() {
  const navigate = useNavigate();
  const [compteur, setCompteur] = useState(3);

    /*deconneciton and redirection in home page*/
  useEffect(() => {
     localStorage.removeItem("token");
        navigate("/deconnection");
    if (compteur === 0) {
      // Redirection quand le compteur arrive à 0
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setCompteur(prev => prev - 1);
    }, 1000); // décrémente toutes les 1 seconde

    return () => clearTimeout(timer);
  }, [compteur, navigate]);

  return (
    <div className="Deconnection">
      <h1>Vous êtes déconnecté</h1>
      <p>Retour à l'accueil dans {compteur}</p>
    </div>
  );
}
