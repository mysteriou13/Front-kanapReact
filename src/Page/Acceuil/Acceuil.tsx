import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Kanap from "../../Component/Kanap/Kanap";
import "./acceuil.css"
import type { KanapItem } from "../../Interface/InterfaceKanap";

export default function Acceuil() {
   let navigate = useNavigate();

  const [data, setdata] = useState<KanapItem[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
   
    const fetchData = async () => {
      let product = await fetch(`${API_URL}/product/displayProduct`);
      let reponse = await product.json();

      console.log("accecui", reponse.products);
      setdata(reponse.products);
    };
    fetchData();
  }, []);

  return (
    <>
    <div className="liste_kanap">
     {data && data.map((item) => (
        <div onClick={() => navigate(`/product/${item._id}`)} key={item._id}>
          <Kanap item={item} mode="all" />
        </div>
      ))}
      </div>

  </>
  );
}
