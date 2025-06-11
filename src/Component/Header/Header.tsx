import { Link, useNavigate } from "react-router"
import { useSelector,useDispatch } from 'react-redux';
import type { RootState } from '../../Store/store';
import "./Header.css"
import { useEffect } from "react";
import { addlogin } from "../../Store/Slice";

export default function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let login = useSelector((state: RootState) => state.user.login);

  function deconnection(){
    localStorage.removeItem("token");
    dispatch(addlogin(""));
    navigate("/");
  }

   useEffect(() => {
    if (!login) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(addlogin(token));
      }
    }
  }, [login]);

  return (
    <>
    <header>
        
        {/* menu nav horizontal en flex*/}
       <nav>
        <ul className="Ul_Nav_Header">
         
            <li><Link to="/" className="Ul_Nav_Header_Link">Home </Link> </li>
            
          {login ? (
            <>
              <li><Link to="/profil" className="Ul_Nav_Header_Link">profil</Link></li>  
              <li><Link to="panier" className="Ul_Nav_Header_Link">panier </Link></li>

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
