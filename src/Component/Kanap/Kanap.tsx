
import "./Kanap.css"
import type { KanapProps } from "../../Interface/InterfaceKanap";
import {  useState } from "react";

export default function Kanap({ item, mode }: KanapProps) {

    const API_URL = import.meta.env.VITE_API_URL;

    const { _id, imageUrl, altTxt, name, price, colors } = item;
      
    const colorsString = colors[0];

    const [color,setColor] = useState<string>(colorsString)
    const [nbkananp,setNbkanap] =useState<number>(0);


     const addkanap  = ()=>{
  
     const { _id, colors, ...rest } = item;
 let panier = {
    ...rest,
     color: color,
     nbkananp: nbkananp
};
         
         }

    return (
     <div className="main_div_kanap_acceuil" key={_id}>
       <div className="div_img_kanap_acceuil">
           
           <img className="img_kanap_acceuil" src={`${API_URL}/images/${imageUrl}`} alt={altTxt} />
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
                Quantity  <input type="number" value={nbkananp} onChange={e => setNbkanap(Number(e.target.value))} />
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
