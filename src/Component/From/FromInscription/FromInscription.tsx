
import"./FromInscription.css"
import  { useState } from 'react';
/*inscription user*/
export default function FromInscription() {



const [datastring, setdatastring] = useState<{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  country: string;
  city:string;
  zipCode:string;
  phone:string;
  errorConfirmPassword:string;
  errorEmail:boolean;
  errorEmailText:string;
}>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  address: '',
  country: '',
  city: '',
  zipCode: '',
  phone: '',
  errorConfirmPassword:'',
  errorEmail: false,
  errorEmailText:''
});

/*verif que le formualaire a etais soumis*/
const [bolsubmit,bolsetSubmit] = useState<boolean>(false);

  const inscription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let FullObject:boolean = false
 
    bolsetSubmit(true);

    /*data pour le back*/
   const { errorConfirmPassword, errorEmail, errorEmailText, ...user } = datastring;


for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
  if(value ===""){
FullObject = false
  }else{
    FullObject = true;
  }
}

const API_URL = import.meta.env.VITE_API_URL;

/*verif que le password et que confirm password sont indentique*/

if (datastring.password !== datastring.confirmPassword) {	
   setdatastring({...datastring, errorConfirmPassword:"Les mots de passe ne correspondent pas."});
}else{
  setdatastring({...datastring, errorConfirmPassword:""}); // Réinitialiser l'erreur si les mots de passe correspondent
}


if(FullObject == true  && datastring.errorEmail == false && datastring.password === datastring.confirmPassword){
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
  setdatastring({...datastring,errorEmailText:reponse.message})

}


}

 bolsetSubmit(false);


  }
  return (
    <>
    <div>
     
    <form onSubmit={inscription} className = "fromInscription">
    <label htmlFor="firstName">Prénom</label>
    <input type="text" id="firstName" name="firstName" value ={datastring.firstName} required onChange={e =>setdatastring({...datastring, firstName:e.target.value})}/>
    <label htmlFor="lastName">Nom</label>
    <input type="text" id="lastName" name="lastName" value = {datastring.lastName} 
    onChange={e=> setdatastring({ ...datastring, lastName:e.target.value})}required/>   

    <label htmlFor="email">Email</label>  
    <input type="email" id="email" name="email" value = {datastring.email} onChange={e=> setdatastring({...datastring, email:e.target.value})} required/> 
    {/* Affichage de l'erreur si l'email n'est pas valide */}
    {datastring.errorEmail &&
    <p className="errorMail">{datastring.errorEmailText}</p>
    
    }


      
    <label htmlFor="password">Mot de passe</label>
    <input type="password" id="password" name="password"  onChange={e=> setdatastring({...datastring, password:e.target.value })} required/>
    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
    <input type="password" id="confirmPassword" name="confirmPassword"   onChange = {e=>setdatastring({...datastring, confirmPassword:e.target.value})}required/>
 {datastring.password && datastring.confirmPassword  && bolsubmit && (datastring.password !== datastring.confirmPassword ? (
      <p className="error">{datastring.errorConfirmPassword}</p>
    ) : (
      <p className="success">Les mots de passe correspondent.</p>
    )
  )}
    <label htmlFor="address">Adresse</label> 
    <input type="text" id="address" name="address" value = {datastring.address} onChange={e=> setdatastring({...datastring, address:e.target.value})} required/>
    <label htmlFor="city">Ville</label>
    <input type="text" id="city" name="city" value = {datastring.city} onChange={e=> setdatastring({...datastring,city:e.target.value})} required/>
    <label htmlFor="zipCode">Code postal</label>
    <input type="text" id="zipCode" name="zipCode" value={datastring.zipCode} onChange={e=> setdatastring({...datastring, zipCode:e.target.value})}  required/>
    <label htmlFor="country">Pays</label>
    <input type="text" id="country" name="country" value  =  {datastring.country} onChange={e=> setdatastring({...datastring, country:e.target.value})} required/>
    <label htmlFor="phone">Téléphone</label>
    <input type="tel" id="phone" name="phone" value = {datastring.phone} onChange={e=> setdatastring({...datastring, phone:e.target.value})} required/>

   <input type= "submit"/>

    </form>

    </div>
    </>
  )
}
