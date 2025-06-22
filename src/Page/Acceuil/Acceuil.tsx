import { useEffect, useState } from "react";
import "./acceuil.css"
interface Product {
  name: string,
  _id:string,
  price:string,
  colors: Array<string>
  imageUrl:string,
  description:string,
  altTxt:string
}

export default function Acceuil() {

  const [data, setdata] = useState<Product[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log("acceuil");
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
      {data.map((item) => (
        
        <div key={item._id}>
          <div>
          {item.name}
          </div>

          <div>
            {item.price}€
          </div>

          <div>
            {item.colors.map((color) => (
              <div>
              {color}

              </div>

            ))}
          </div>

          <div className="div_img_kanap_acceuil">
           
           <img className="img_kanap_acceuil" src={`${API_URL}/images/${item.imageUrl}`} alt={item.altTxt} />

          </div>
        </div>
      ))}
    </>
  );
}
