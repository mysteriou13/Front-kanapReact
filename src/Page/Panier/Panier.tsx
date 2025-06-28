import { useSelector } from "react-redux";
import type { RootState } from "../../Store/store";
import type { PanierItem } from "../../Interface/InterfacePanier";
import { useEffect, useState } from "react";
import "./Panier.css"


export default function Panier() {
  const panier = useSelector((state: RootState) => state.user.panier);

    const API_URL = import.meta.env.VITE_API_URL;

  const [tabpanier] = useState<PanierItem[]>(panier as PanierItem[])
  
  const [totalunitaire,settotalunitaire] =useState<number[]>([])

  const [tabtotalquantity,settabtotalquantity] =useState<number[]>([])

  const [totalkanap, settotalkananb] = useState<number>(0)


  let totalpricecalcul:number = 0

  let totalquantitynb:number = 0;

  

  let [totalprice,settotalprice] = useState<number>();

  /*total prix du panier*/
  const caltotlalprice = ()=>{
    /*total de la commande*/
    const totals = (panier as PanierItem[]).map((data) => {
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

      const quantities = (panier as PanierItem[]).map((data: PanierItem) => {
     console.log("panier", data.nbkananp);
     return data.nbkananp;
   });
   settabtotalquantity(quantities);
 
   for(let a: number = 0; a < tabtotalquantity.length; a++) {
   
       totalquantitynb = totalquantitynb + tabtotalquantity[a];
    
    }
settotalkananb(totalquantitynb)

  }
  useEffect(() => {

    
   /*calcul quantity panier*/
   caltotlalprice()

   caltotlaquantity();
 
console.log("total map quantity",totalquantitynb);
  }, [totalprice]);

  return (
    <div>

    <div className="main_flex_panier"> 
      
    <div>
    {tabpanier.map((item, idx) => (
      <div key={idx}  className="main_div_panier">
        <h3>{item.name}</h3>
        <div className="div_panier">
        <img  className = "img_panier" src={`${API_URL}/images/${item.imageUrl}`} alt={item.altTxt} />
         </div>

         <div>
        <p>Couleur : {item.color}</p>
        <p>Quantité : {item.nbkananp}</p>
        <p>Description : {item.description}</p>
        <p>Prix : {item.price} €</p>
        <p>Sous total:{item.price*item.nbkananp}€</p>
        </div>
      </div>
    ))}
    </div>
    <div className="total_panier">
    
    <div>nombre d'acticle:{totalkanap}</div>

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