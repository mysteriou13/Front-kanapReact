1 
import  { useState } from "react";
import "./FromConnection.css"

export default function FromConnection() {
    
    console

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const[FullObject,setFullObject] = useState<boolean>(false)

    function connection(){

    let user:object= {
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


if(FullObject === true){

    console.log("fullobjet",user)

}else{


}

    }

    return (
    <div>
        <form action = {connection}>
            <h1>Connexion</h1>
            <label htmlFor="email">Email:</label>
            <input type="email" onChange={e =>setEmail(e.target.value)}  />
            
            <label htmlFor="password">Mot de passe:</label>
            <input type="password" onChange={e => setPassword(e.target.value)}   />
            
            <button type="submit">Se connecter</button>
        </form>
    </div>
  )
}
