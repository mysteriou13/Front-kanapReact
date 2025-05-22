import { createBrowserRouter } from "react-router";
import Acceuil from "./Component/Acceuil/Acceuil";
import Test from "./Component/Test/Test";
import Default from "./Layout/Default/Default";
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
    ],
  },
]);

