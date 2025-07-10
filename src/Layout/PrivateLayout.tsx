import { Outlet } from "react-router"

import { useSelector } from 'react-redux';
import type { RootState } from '../Store/store';

import Header from "../Component/Header/Header"
import FromConnection from "../Component/From/FromConnection/FromConnection"
export default function PrivateLayout() {

  let login = useSelector((state: RootState) => state.user.login) || localStorage.getItem("token");

  

  return (
    <div>
        <>

        {
            login?
            
            <Outlet/> 

            :<FromConnection/>

            
        }
        </>

    </div>
  )
}
