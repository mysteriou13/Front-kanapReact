import { createBrowserRouter } from "react-router";
import Acceuil from "./Component/Acceuil/Acceuil";
import Test from "./Component/Test/Test";


export  const router = createBrowserRouter([
  {
    path: "/",
    Component: Acceuil,
  },
  {
    path: "/test",
    Component: Test,
  },
]);

