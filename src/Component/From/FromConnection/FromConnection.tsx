import  {  useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../Store/store'; // adapte le chemin selon ton arborescence

import { addlogin } from '../../../Store/Slice'; // adapte le chemin selon ton arborescence
import "./FromConnection.css"

export default function FromConnection() {
const API_URL = import.meta.env.VITE_API_URL;
const dispatch = useDispatch();
const login = useSelector((state: RootState) => state.user.login);

    let navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    
    const [password, setPassword] = useState<string>("");
    
    const[_FullObject,setFullObject] = useState<boolean>(false)
    
    const[_bolsubmit,setSubmit] = useState<boolean>(false)

    const[ErrorMessageEmail,setMessageEmail] = useState<string>("")
 
     const[ErrorMessagePassword,setErrorMessagePassword] = useState<string>('')

       useEffect(() => {
        if (login) {
          navigate("/");

        }
      }, [login]);


    /* all error email input */
    function ErrorEmailInput(){
        
       return <div>
        {ErrorMessageEmail}
        </div>  

    }
    function ErrorPasswordInput(){
    return <div>{ErrorMessagePassword}</div>
    }
    /* function for Fromualire is full*/
    function isFormFull(user: Record<string, string>) {
        return Object.values(user).every(value => value !== "");
      }
    
      /*connection user*/
      async function connection(e: React.FormEvent) {
        e.preventDefault();
        setSubmit(true);
    
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
    
        console.log("reponse connection",reponse);
    
          if(reponse.status == true){
             
            localStorage.setItem("token",reponse.token);
            dispatch(addlogin(reponse.token));
            
          }

          if (reponse.mail == false) {
            setMessageEmail("email non trouver");
          } 
          if (reponse.mail == true) {
            setMessageEmail("");
          }

          if (reponse.pass == false) {
            setErrorMessagePassword("mot passe incorrect");
          } else {
            setErrorMessagePassword("");
          }

        
        setSubmit(false);
      }
  
      /*useeffet si le token est  dans localstorage apres connection*/

    


    return (
        <>
    <div>
        <form onSubmit={connection} className="fromconnection">
            <h1>Connexion</h1>
            <div>
            
            <div>
            <label htmlFor="email">Email:</label>
            </div>
            <div>
            <input type="email" value={email} onChange={e =>setEmail(e.target.value)}  /> 
            </div>
            <div>
            <ErrorEmailInput/>
            </div>
            </div>

            <div>
            <div>
            <div>
            <label htmlFor="password">Mot de passe:</label>
            </div>
            <div>
            <input type="password" onChange={e => setPassword(e.target.value)}   />
             </div>
             </div>
             <div>
            <ErrorPasswordInput/>
             </div>
             </div>
            <input type="submit"/>
        </form>
    </div>
  </>
  )
  
}
