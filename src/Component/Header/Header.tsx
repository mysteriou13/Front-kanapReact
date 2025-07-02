import { useNavigate } from "react-router"
import { useSelector,useDispatch } from 'react-redux';
import type { RootState } from '../../Store/store';
import "./Header.css"
import { useEffect, useState } from "react";
import { addlogin } from "../../Store/Slice";

export default function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let login = useSelector((state: RootState) => state.user.login);

  let addpaniers = useSelector((state: RootState) => state.user.addpanier);

  // Ensure panierCount is a number for rendering
  const [panierCount,setPanierCount] = useState(0);

  const[datauser,setDataUser] = useState<any>({});

  const updatePanierCount = () => {
    const localpanier = JSON.parse(localStorage.getItem("panier") || "[]");
    setPanierCount(localpanier.length);
  };

  useEffect(()=>{

    console.log("Header", addpaniers);


  // Mets à jour au chargement
  updatePanierCount();
  },[addpaniers])

  const  deconnection= () =>{
    localStorage.removeItem("token");
    dispatch(addlogin());
    navigate("/");
  }

   useEffect(() => {
    const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const API_URL = import.meta.env.VITE_API_URL;
      let datauser = await fetch(`${API_URL}/users/datauser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token 
        }
      });

      let reponse = await datauser.json();
      localStorage.setItem("datauser", JSON.stringify(reponse));
      let reponsedata = JSON.parse(localStorage.getItem("datauser") || "{}");
      setDataUser(reponsedata.data);

    }
  };
  fetchData();
}, [login]);

  return (
    <>
    <header>
  
        {/* menu nav horizontal en flex*/}
       <nav>
        <ul className="Ul_Nav_Header">

          {login &&(
          <li className="Ul_Nav_Header_Link">bonjour {datauser.firstName}</li>
          )}
            <li onClick={()=> navigate("/")} className="Ul_Nav_Header_Link">Home </li>
            
          {login ? (
            <>
              
              <li onClick={()=> navigate("/Profil")} className="Ul_Nav_Header_Link">profil </li>  
              <li onClick={()=> navigate("/panier")}  className="Ul_Nav_Header_Link">panier({panierCount}) </li>

              <li className="buttonDeconnection" onClick={()=> deconnection()}> Deconnection </li>
            </>
          ) : (
            <>
              <li onClick={()=> navigate("connection")} className="Ul_Nav_Header_Link"> connection</li>
              <li onClick={()=> navigate("inscription")} className="Ul_Nav_Header_Link"> inscription</li>  
            </>
          )}
          
        
        </ul>
       </nav>



    </header>
  </>
  )
  
}
