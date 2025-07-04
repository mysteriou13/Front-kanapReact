import  {  useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../Store/store'; // adapte le chemin selon ton arborescence

import { addlogin } from '../../../Store/Slice'; // adapte le chemin selon ton arborescence

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

import "./FromConnection.css"

export default function FromConnection() {
const API_URL = import.meta.env.VITE_API_URL;
const dispatch = useDispatch();
const login = useSelector((state: RootState) => state.user.login);

    let navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    
    const [password, setPassword] = useState<string>("");
    
    const[_FullObject,setFullObject] = useState<boolean>(false)
    
    const[bolsubmit,setbolSubmit] = useState<boolean>(false)

    const[ErrorMessageEmail,setMessageEmail] = useState<string>("")
 
     const[ErrorMessagePassword,setErrorMessagePassword] = useState<string>('')

       useEffect(() => {
        if (login) {
          navigate("/");

        }
      }, [login]);


    /* function for Fromualire is full*/
    function isFormFull(user: Record<string, string>) {
        return Object.values(user).every(value => value !== "");
      }
    
      /*connection user*/
      async function connection(e: React.FormEvent) {
        e.preventDefault();
       setbolSubmit(true);
    
        const user = {
          email,
          password
        };
    
        /* if le all input is not empty*/
        if (!isFormFull(user)) {
          setFullObject(false);
          return;
        } else {
          setFullObject(true);
        }
        
     
        let data = await fetch(`${API_URL}/users/connection`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(user)
        });
    
        let reponse = await data.json();
       
         if(!reponse.status){

          setbolSubmit(false);

         }else{
          setbolSubmit(true)
         }
       
          if(reponse.status == true){
             
            localStorage.setItem("token",reponse.token);
            dispatch(addlogin());
            
          }

          if (reponse.mail == false) {
            setMessageEmail("email non trouver");
          } 
          if (reponse.mail == true) {
            setMessageEmail("");
          }

          if (reponse.pass == false && bolsubmit == false) {
            setErrorMessagePassword("mot passe incorrect");
          } else {
            setErrorMessagePassword("");
          }

       console.log("fromconnection",reponse.pass,"/bolsumit/",bolsubmit);        
        
      }
  
    return (
        <>
    <div>
      
      <div>
 
   

        {bolsubmit == false ?(
        <div>        
        <form onSubmit={connection} className="fromconnection">
            <h1>Connexion</h1>
            <div>
            
            <div>
            <label className="label_connection" htmlFor="email">Email:</label>
            </div>
            <div>
            <input type="email" value={email} onChange={e =>setEmail(e.target.value)}  /> 
            </div>
            <div>
       { bolsubmit && (
          <>
        <div className="errorInput">
             {ErrorMessageEmail}
        </div>
          </>

      )}

  </div>
  </div>

            <div>
            <div>
            <div>
            <label htmlFor="password" className="label_connection">Mot de passe:</label>
            </div>
            <div>
            <input type="password" onChange={e => setPassword(e.target.value)}   />
             </div>
             </div>
             
             <div className="errorInput">
                <div>{ErrorMessagePassword}</div>
             </div>
             

             </div>
            <input type="submit"/>
        </form>
        </div>
        ):(

          <LoadingSpinner/>

        )
            }



        <div>
       
        </div>
        </div>

    </div>
  </>
  )
  
}
