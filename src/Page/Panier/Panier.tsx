
import type { PanierItem } from "../../Interface/InterfacePanier";
import { useEffect, useState } from "react";
import "./Panier.css"

export default function Panier() {
 const panierArray = JSON.parse(localStorage.getItem("panier") || "[]");
  /*URL dans back*/
  const API_URL = import.meta.env.VITE_API_URL;
  
  const [panierdata, setpanierdata] = useState<PanierItem[]>([]);

  /* le panier du redux en state */

  /*sous total prix des article*/
  const [totalunitaire,settotalunitaire] =useState<number[]>([])

  /*tableaux des quantiter */
  const [tabtotalquantity,settabtotalquantity] =useState<number[]>([])

  /*total quantiter article du panier*/
  const [totalkanap, settotalkananb] = useState<number>(0)

  let totalpricecalcul:number = 0

  let totalquantitynb:number = 0;

  let [totalprice,settotalprice] = useState<number>();

  useEffect(()=>{

  setpanierdata(panierArray)


 caltotlalprice();

   caltotlaquantity();
 
  },[])

  /*total prix du panier*/
  const caltotlalprice = ()=>{
    /*total prix de la commande*/
     const panierArray = JSON.parse(localStorage.getItem("panier") || "[]");

    const totals = (panierArray as PanierItem[]).map((data) => {
      return data.nbkananp * data.price;
    });
    settotalunitaire(totals);
    
     for(let a: number = 0; a < totalunitaire.length; a++){

      console.log("prix unitaire",totalunitaire[a])

      totalpricecalcul = totalpricecalcul+totalunitaire[a]

     }

     settotalprice(totalpricecalcul)

  }

/*total quantity kanap dans le panier*/
  const caltotlaquantity = ()=>{
     
 const panierArray = JSON.parse(localStorage.getItem("panier") || "[]");

 console.log("cal totalquantity",panierArray);

      const quantities = (panierArray as PanierItem[]).map((data: PanierItem) => {
     return data.nbkananp;
   });

   console.log("quantity",quantities);

   settabtotalquantity(quantities);
 
   for(let a: number = 0; a < tabtotalquantity.length; a++) {
   
       totalquantitynb = totalquantitynb + tabtotalquantity[a];
    
    }
settotalkananb(totalquantitynb)

  }
  
  useEffect(() => {
  // Calcul du total prix
  const totalPrice = panierdata.reduce((acc, item) => acc + item.price * item.nbkananp, 0);
  settotalprice(totalPrice);

  // Calcul du total quantité
  const totalQuantity = panierdata.reduce((acc, item) => acc + item.nbkananp, 0);
  settotalkananb(totalQuantity);
}, [panierdata]);

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