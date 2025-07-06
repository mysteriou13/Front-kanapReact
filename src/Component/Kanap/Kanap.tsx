
import "./Kanap.css"
import type { KanapProps } from "../../Interface/InterfaceKanap";
import { useDispatch } from 'react-redux';
import { boladdpanier } from "../../Store/Slice";
import {  useEffect, useState } from "react";

export default function Kanap({ item, mode }: KanapProps) {

    const API_URL = import.meta.env.VITE_API_URL;
     const dispatch = useDispatch();

    const { _id, imageUrl, altTxt, name, price, colors } = item;
      
    const colorsString = colors[0];
    let [main_kanap,setmainkanap] = useState<string>("")

    let [img_kanap,setimgkanap] = useState<string>("")

    const [color,setColor] = useState<string>(colorsString)
    const [nbkananp,setNbkanap] =useState<number>(0);
 
const addkanap = () => {
    const {  ...rest } = item;
    const newItem = {
        ...rest,
        listeColor: colors,
        color: color,
        nbkananp: nbkananp
    };

    // Récupère le panier existant ou un tableau vide
    const panierArray = JSON.parse(localStorage.getItem("panier") || "[]");

    // Vérifie si l'item existe déjà dans le panier
    const existingItemIndex = panierArray.findIndex((i: any) => i._id === newItem._id && i.color === newItem.color);

    if (existingItemIndex !== -1) {
        // Si l'item existe déjà, on met à jour la quantité
        panierArray[existingItemIndex].nbkananp += newItem.nbkananp;
    } else {
        // Sinon, on ajoute le nouvel item au panier
        panierArray.push(newItem);
           dispatch(boladdpanier()); 
      }
   
    // Enregistre le panier mis à jour dans le localStorage
    localStorage.setItem("panier", JSON.stringify(panierArray));


 

};

useEffect(() => {
    if (mode === "one") {
        
      setmainkanap("main_div_One_kanap_acceuil");
      setimgkanap("img_kanap_One_acceuil")

    }

    if (mode == "all") {
        setmainkanap("main_div_kanap_acceuil");
        setimgkanap("img_kanap_acceuil")
    }
}, [mode]);

    return (
     <div className = {main_kanap} key={_id}>
       <div className="div_img_kanap_acceuil">
           
           <img className={img_kanap} src={`${API_URL}/images/${imageUrl}`} alt={altTxt} />
           </div>
      <div className="main_text_kanap">
          <div>
         name: {name}
          </div>

          <div>
           prix: {price}€
          </div>

        
      
        {mode == "one"&&(  
      <>
            <div>
                Quantity  <input type="number" min = "1" value={nbkananp} onChange={e => setNbkanap(Number(e.target.value))} />
              </div><div>
                  <label>
                    couleur

                    <select
                      name="selecolor"
                      value={color}
                      onChange={e => setColor(e.target.value)}
                    >
                      {colors.map((color) => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>

                  </label>
                  <div> <input type="button" value="ajouter au panier" onClick={addkanap} /></div>
                </div>
          </>

          )}
      

        
          </div>
            
         
        </div>
  )
}
