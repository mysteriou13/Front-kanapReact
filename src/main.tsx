import { RouterProvider } from "react-router";
import { router } from "./router";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './Store/store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
