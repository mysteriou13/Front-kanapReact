import { Link, useNavigate } from "react-router"
import { useSelector,useDispatch } from 'react-redux';
import type { RootState } from '../../Store/store';
import "./Header.css"
import { useEffect, useState } from "react";
import { addlogin } from "../../Store/Slice";

export default function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let login = useSelector((state: RootState) => state.user.login);

  // Ensure panierCount is a number for rendering
  const [panierCount,setPanierCount] = useState(0);

  const[datauser,setDataUser] = useState<any>({});

useEffect(() => {
  const updatePanierCount = () => {
    const localpanier = JSON.parse(localStorage.getItem("panier") || "[]");
    setPanierCount(localpanier.length);
  };

  // Mets à jour au chargement
  updatePanierCount();

  // Mets à jour à chaque event custom
  window.addEventListener("panierUpdated", updatePanierCount);

 
}, []);
  
  const  deconnection= () =>{
    localStorage.removeItem("token");
    dispatch(addlogin(""));
    navigate("/");
  }

   useEffect(() => {
    const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(addlogin(token));
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

      console.log("datauser", reponsedata.data);
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
            <li><Link to="/" className="Ul_Nav_Header_Link">Home </Link> </li>
            
          {login ? (
            <>
              
              <li><Link to="/Profil" className="Ul_Nav_Header_Link">profil</Link></li>  
              <li><Link to="panier" className="Ul_Nav_Header_Link">panier({panierCount}) </Link></li>

              <li><p className="buttonDeconnection" onClick={()=> deconnection()}> Deconnection</p></li>
            </>
          ) : (
            <>
              <li><Link to="connection" className="Ul_Nav_Header_Link"> connection</Link></li>
              <li><Link to="inscription" className="Ul_Nav_Header_Link"> inscription</Link></li>  
            </>
          )}
          
        
        </ul>
       </nav>



    </header>
  </>
  )
  
}
