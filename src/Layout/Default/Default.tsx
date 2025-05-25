import Header from "../../Component/Header/Header"
import { Outlet } from "react-router"

export default function Default() {
  return (
    <div>
    <Header/>
    <Outlet/>
    </div>

)

}
