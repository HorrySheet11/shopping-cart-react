import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorFile from './components/ErrorFile.jsx';
import Home from './components/Home.jsx';
import Shopping from './components/Shopping.jsx';
import Cart from './components/Cart.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorFile />,
    children: [
      { path: "home", element: <Home /> },
      { path: "shopping", element: <Shopping /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
