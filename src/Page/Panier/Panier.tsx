
import type { PanierItem } from "../../Interface/InterfacePanier";
import { useEffect, useState } from "react";
import "./Panier.css"

export default function Panier() {
 const panierArray = JSON.parse(localStorage.getItem("panier") || "[]");
  /*URL dans back*/
  const API_URL = import.meta.env.VITE_API_URL;
  
  const [panierdata, setpanierdata] = useState<PanierItem[]>([]);

  /*total quantiter article du panier*/
  const [totalkanap, settotalkananb] = useState<number>(0);

  let [totalprice,settotalprice] = useState<number>();

  useEffect(()=>{

  setpanierdata(panierArray);

  console.log("panierdata", panierdata);
 
  },[])
  
  useEffect(() => {
  // Calcul du total prix
  const totalPrice = panierdata.reduce((acc, item) => acc + item.price * item.nbkananp, 0);
  settotalprice(totalPrice);

  // Calcul du total quantité
  const totalQuantity = panierdata.reduce((acc, item) => acc + item.nbkananp, 0);
  settotalkananb(totalQuantity);
}, [panierdata]);

const delette_item  = (idx: number) => {
  const updatedPanier = panierdata.filter((_, index) => index !== idx);
  setpanierdata(updatedPanier);
  localStorage.setItem("panier", JSON.stringify(updatedPanier));
  // Recalculer le total après suppression
  const totalPrice = updatedPanier.reduce((acc, item) => acc + item.price * item.nbkananp, 0);
  settotalprice(totalPrice);
  const totalQuantity = updatedPanier.reduce((acc, item) => acc + item.nbkananp, 0);
  settotalkananb(totalQuantity);
}

  return (
    <div>

    <div className="main_flex_panier"> 
    
    <div>

    {panierdata.map((item, idx) => (
      <div key={idx}  className="main_div_panier">
        <h1>{item.name}</h1>
        <div className="div_panier">
        <img  className = "img_panier" src={`${API_URL}/images/${item.imageUrl}`} alt={item.altTxt} />
         </div>

         <div>
        <h2>
        <p>Couleur : {item.color}</p>
        <p>Quantité : {item.nbkananp}</p>
        <p>Description : {item.description}</p>
        <p>Prix : {item.price} €</p>
        
        <p>Sous total:{item.price*item.nbkananp}€</p> 
        <p> <input type = "button" value = "supprimer"onClick={()=>delette_item(idx)}/>{idx}</p>
        </h2>
        </div>
      </div>
    ))}
    
    </div>

    <div className="total_panier">
    
    <h2>
    <div>nombre d'acticle:{totalkanap}</div>
   </h2>
      <div>
      total de la commande
      </div>

      <div>
      {totalprice}€
      </div>

      </div> 

    </div>

    </div>
  );
}