
import"./FromInscription.css"
import  { useState } from 'react';
/*inscription user*/
export default function FromInscription() {

const [firstName, setFirstName] = useState<string>("");
const [lastName, setLastName] = useState<string>("");
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [confirmPassword, setConfirmPassword] = useState<string>("");
const [address, setAddress] = useState<string>("");
const [county, setCountry] = useState<string>("");
const [city, setCity] = useState<string>("");
const [zipCode, setZipCode] = useState<string>("");
const [phone, setPhone] = useState<string>("");

const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>("");
const [FullObject,setFullObject] = useState<boolean>(false);
const [errorEmailText, setErrorEmailText] = useState<string>("");
const [errorEmail, setErrorEmail] = useState<boolean>(false);

/*verif que le formualaire a etais soumis*/
const [bolsubmit,bolsetSubmit] = useState<boolean>(false);

  async function inscription(){
 bolsetSubmit(true);
 let user = {
  firstName: firstName,
  lastName: lastName,
  email: email,
  password: password,
  address: address,
  city: city,
  zipCode: zipCode,
  country: county,
  phone: phone
}

/*parcourir l'object user pour verfier si un champ est vide avec map*/



for (const key of Object.keys(user) as Array<keyof typeof user>) {
  if (user[key] === "") {

    setFullObject(false);

  }else{
    setFullObject(true);
  }
}

const API_URL = import.meta.env.VITE_API_URL;

/*verif que le password et que confirm password sont indentique*/

if (password !== confirmPassword) {	
   setErrorConfirmPassword("Les mots de passe ne correspondent pas.");
}else{
  setErrorConfirmPassword(""); // Réinitialiser l'erreur si les mots de passe correspondent
}

console.log(FullObject, "FullObject");

if(FullObject == true  && errorEmail == false && password === confirmPassword){
let data = await fetch(`${API_URL}/users/inscription`, {
  method:"POST",
  headers: {
    "Content-Type": "application/json",
  },
  
  body: JSON.stringify(user),
});
let reponse = await data.json();

console.log("fetch inscription",reponse.status);

if(reponse.status == false){
 setErrorEmail(true)
  setErrorEmailText(reponse.message);

}


}

 bolsetSubmit(false);


  }


  function verifyEmail(email: string) {

    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail(email)

  if (!regexEmail.test(email)) {
     
    setErrorEmail(true)
    setErrorEmailText("Veuillez entrer un email valide.");

    }else{
    
      setErrorEmail(false);
      setErrorEmailText(""); // Réinitialiser l'erreur si l'email est valide
    
    }
  }

  return (
    <>
    <div>
     
    <form action = {inscription} className = "fromInscription">
   <h1>Inscription</h1>
    <label htmlFor="firstName">Prénom</label>
    <input type="text" id="firstName" name="firstName" value ={firstName} required onChange={e => setFirstName(e.target.value)}/>
    <label htmlFor="lastName">Nom</label>
    <input type="text" id="lastName" name="lastName" value = {lastName} onChange={e=> setLastName(e.target.value)}required/>   
    <label htmlFor="email">Email</label>  
    <input type="email" id="email" name="email" value = {email} onChange={e=> verifyEmail(e.target.value)} required/> 
    {/* Affichage de l'erreur si l'email n'est pas valide */}
    {errorEmail &&
    <p className="errorMail">{errorEmailText}</p>
    
    }


      
    <label htmlFor="password">Mot de passe</label>
    <input type="password" id="password" name="password"  onChange={e=> setPassword(e.target.value)} required/>
    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
    <input type="password" id="confirmPassword" name="confirmPassword"   onChange = {e=>setConfirmPassword(e.target.value)}required/>
 {password && confirmPassword  && bolsubmit && (password !== confirmPassword ? (
      <p className="error">{errorConfirmPassword}</p>
    ) : (
      <p className="success">Les mots de passe correspondent.</p>
    )
  )}
    <label htmlFor="address">Adresse</label> 
    <input type="text" id="address" name="address" value = {address} onChange={e=> setAddress(e.target.value)} required/>
    <label htmlFor="city">Ville</label>
    <input type="text" id="city" name="city" value = {city} onChange={e=> setCity(e.target.value)} required/>
    <label htmlFor="zipCode">Code postal</label>
    <input type="text" id="zipCode" name="zipCode" value={zipCode} onChange={e=> setZipCode(e.target.value)}  required/>
    <label htmlFor="country">Pays</label>
    <input type="text" id="country" name="country" value  =  {county} onChange={e=> setCountry(e.target.value)} required/>
    <label htmlFor="phone">Téléphone</label>
    <input type="tel" id="phone" name="phone" value = {phone} onChange={e=> setPhone(e.target.value)} required/>

   <input type= "submit"/>

    </form>

    </div>
    </>
  )
}
