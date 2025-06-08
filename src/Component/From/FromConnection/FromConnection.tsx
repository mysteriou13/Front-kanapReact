import  { useState } from "react";
import "./FromConnection.css"
import { flushSync } from "react-dom";

export default function FromConnection() {
const API_URL = import.meta.env.VITE_API_URL;
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const[FullObject,setFullObject] = useState<boolean>(false)
    const[bolsubmit,setSubmit] = useState<boolean>(false)

    const[ErrorEmail, setErroremail] = useState<boolean>(false)
    const[ErrorMessageEmail,setMessageEmail] = useState<string>("")
 
    const[ErrorPassword, setErrorPasssword] = useState<boolean>(false)

    /* all error email input */
    function ErrorEmailInput(){
        if(bolsubmit == true && email !=="" && ErrorEmail == false){
       return <div>
        {ErrorMessageEmail}
        </div>
        }

    }

    /*connection user*/
   async function connection(){

        setSubmit(true);

    const user:object= {
        email:email,
        password:password
    }    

  
/* verif if  all input formulaire is full*/
   for (const value of Object.values(user)) {

     if (value === "") {
  setFullObject(false)
     }else{
        setFullObject(true)
     }

}

/*if  all input  is full fetch data at back*/
if(FullObject === true){

    console.log("fullobjet",user)

    let data  = await fetch(`${API_URL}/users/connection`,{

         headers: {
           "Content-Type": "application/json",
       },

        method:"POST",
        body:JSON.stringify(user)

    })
    
    let reponse = await data.json();
      
    if(reponse.status == false ){

   setMessageEmail(reponse.errorMail)

    }else{
        setErroremail(true);
    }
    console.log("reponse data connection",reponse);

}else{


}



    }


    return (
        <>
    <div>
        <form action = {connection}>
            <div>
            <h1>Connexion</h1>
            <label htmlFor="email">Email:</label>
            <input type="email" onChange={e =>setEmail(e.target.value)}  /> 
            <div>
            <ErrorEmailInput/>
            </div>
            </div>
            <label htmlFor="password">Mot de passe:</label>
            <input type="password" onChange={e => setPassword(e.target.value)}   />
            
            <input type="submit"/>
        </form>
    </div>
  </>
  )
  
}
