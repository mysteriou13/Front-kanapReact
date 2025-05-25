import { Link } from "react-router"
import "./Header.css"
export default function Header() {
  return (
    <header>
        
        {/* menu nav horizontal en flex*/}
       <nav>
        <ul className="Ul_Nav_Header">
            <li><Link to="/" className="Ul_Nav_Header_Link">Home </Link> </li>
            <li ><Link to="panier" className="Ul_Nav_Header_Link">panier </Link></li>
            <li><Link to = "connection" className="Ul_Nav_Header_Link"> connection</Link></li>
            <li><Link to = "inscription" className="Ul_Nav_Header_Link"> inscription</Link></li>
        </ul>
       </nav>



    </header>
  )
}
