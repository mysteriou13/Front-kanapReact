import { createBrowserRouter } from "react-router";
import Acceuil from "./Page/Acceuil/Acceuil";
import Test from "./Component/Test/Test";
import Default from "./Layout/Default/Default";
import Connection from "./Page/Connection/Connection";
import Inscription from "./Page/Inscription/Inscription";
import Panier from "./Page/Panier/Panier";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default/>, // Le layout principal
    children: [
      {
        index: true,
        element: <Acceuil />,
      },
      {
        path: "test",
        element: <Test />,
      },

       {
         path: "connection",
         element: <Connection />,
       },

      {
        path: "inscription",
        element: <Inscription />,
      },
     {
      path: "panier",
      element: <Panier />,
     }
    ],
  },
]);

