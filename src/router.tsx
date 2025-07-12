import { createBrowserRouter } from "react-router";
import Acceuil from "./Page/Acceuil/Acceuil";
import Test from "./Component/Test/Test";
import Default from "./Layout/Default/Default";
import PrivateLayout from "./Layout/PrivateLayout";
import Connection from "./Page/Connection/Connection";
import Inscription from "./Page/Inscription/Inscription";
import Profil from "./Page/Profil/Profil";
import NotFound from "./Page/NotFound/NotFound";
import Panier from "./Page/Panier/Panier";
import OneKanap from "./Page/OneKanap/OneKanap";
import Deconnection from "./Page/Deconnection/Deconnection";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      { index: true, element: <Acceuil /> },
      { path: "test", element: <Test /> },
      { path: "connection", element: <Connection /> },
      { path: "inscription", element: <Inscription /> },
      { path: "product/:id", element: <OneKanap /> },
      { path: "*", element: <NotFound /> },

      // 🔒 Routes protégées
      {
        element: <PrivateLayout />, // vérifie l'authentification
        children: [
          { path: "panier", element: <Panier /> },
          { path: "profil", element: <Profil /> },
            {path : "deconnection", element:<Deconnection/>},
        ],
      },
    ],
  },
]);


