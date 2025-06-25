import { useEffect, useState } from "react";
import Kanap from "../../Component/Kanap/Kanap";
import "./acceuil.css"
import type { KanapItem } from "../../Interface/InterfaceKanap";

export default function Acceuil() {

  const [data, setdata] = useState<KanapItem[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
   
    const fetchData = async () => {
      let product = await fetch(`${API_URL}/product/displayproduct`);
      let reponse = await product.json();

      console.log("accecui", reponse.products);
      setdata(reponse.products);
    };
    fetchData();
  }, []);

  return (
    <>
    <div className="liste_kanap">
      {data.map((item) => (
        <Kanap item={item} mode="all" key={item._id} />
      ))}
      </div>

  </>
  );
}
