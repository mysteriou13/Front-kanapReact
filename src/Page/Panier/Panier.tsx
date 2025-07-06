import type { PanierItem } from "../../Interface/InterfacePanier";
import { boladdpanier } from "../../Store/Slice";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import "./Panier.css"

export default function Panier() {
  let dispatch = useDispatch();
 const panierArray = JSON.parse(localStorage.getItem("panier") || "[]");
  /*URL dans back*/
  const API_URL = import.meta.env.VITE_API_URL;
  
  const [panierdata, setpanierdata] = useState<PanierItem[]>([]);

  /*total quantiter article du panier*/
  const [totalkanap, settotalkananb] = useState<number>(0);

  /*total prix du panier*/
  let [totalprice,settotalprice] = useState<number>();

  const updateItemField = (itemcolor: string, field: keyof PanierItem, value: any) => {
    const updatedPanier = panierdata.map((item) => {
      if (item.color === itemcolor) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setpanierdata(updatedPanier);
    localStorage.setItem("panier", JSON.stringify(updatedPanier));
  };

  useEffect(()=>{

  setpanierdata(panierArray);

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
  dispatch(boladdpanier());
  
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
        
      
   {/*liste color*/}
   <select onChange={(e) => updateItemField(item.color, "color", e.target.value)} value={item.color}>
  {item.listeColor.map((col) => (
    <option value={col} key={col}>{col}</option>
  ))}
</select>



        <p>Quantité : {item.nbkananp} <input type="number" min={1} value={item.nbkananp} onChange={(e) => updateItemField(item.color, "nbkananp", Number(e.target.value))} /> </p>
        <p>Description : {item.description}</p>
        <p>Prix : {item.price} €</p>
        
        <p>Sous total:{item.price*item.nbkananp}€</p> {idx}
        <p> <input type = "button" value = "supprimer" onClick={() => delette_item(idx)} /></p>
        </h2>
        </div>
      </div>
    ))}
    
    </div>

    {panierdata.length > 0 &&
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
      }
    </div>

    </div>
  );
}