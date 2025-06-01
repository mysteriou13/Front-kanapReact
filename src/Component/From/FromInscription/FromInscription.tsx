import"./FromInscription.css"
import  { useState } from 'react';
/*inscription user*/
export default function FromInscription() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [zipCode, setZipCode] = useState("");
const [phone, setPhone] = useState("");


  function inscription(){

 let user = {
  firstName: firstName,
  lastName: lastName,
  email: email,
  password: password,
  address: address,
  city: city,
  zipCode: zipCode,
  phone: phone
}

fetch("http://localhost:3000/users/inscription", {
  method:"POST",
  headers: {
    "Content-Type": "application/json",
  },
  
  body: JSON.stringify(user),

}

);

  }

  return (
    <div>
     
    <form action = {inscription} className = "fromInscription">
   <h1>Inscription</h1>
    <label htmlFor="firstName">Prénom</label>
    <input type="text" id="firstName" name="firstName" required onChange={e => setFirstName(e.target.value)}/>
    <label htmlFor="lastName">Nom</label>
    <input type="text" id="lastName" name="lastName" onChange={e=> setLastName(e.target.value)}required/>   
    <label htmlFor="email">Email</label>  
    <input type="email" id="email" name="email" onChange={e=> setEmail(e.target.value)} required/>
    <label htmlFor="password">Mot de passe</label>
    <input type="password" id="password" name="password" onChange={e=> setPassword(e.target.value)} required/>
    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
    <input type="password" id="confirmPassword" name="confirmPassword" required/>
    <label htmlFor="address">Adresse</label> 
    <input type="text" id="address" name="address" onChange={e=> setAddress(e.target.value)} required/>
    <label htmlFor="city">Ville</label>
    <input type="text" id="city" name="city" onChange={e=> setCity(e.target.value)} required/>
    <label htmlFor="zipCode">Code postal</label>
    <input type="text" id="zipCode" name="zipCode"onChange={e=> setZipCode(e.target.value)}  required/>
    <label htmlFor="phone">Téléphone</label>
    <input type="tel" id="phone" name="phone" onChange={e=> setPhone(e.target.value)} required/>

   <input type= "submit"/>

    </form>

    </div>
  )
}
