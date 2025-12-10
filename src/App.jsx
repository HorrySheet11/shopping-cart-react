import React,{ useState } from 'react'
import './App.css'
import { Outlet,Link } from "react-router";
import styles from './styles.module.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()
function App() {
  const [cart, setCart] = useState([]);
  
  const handleCartData = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log(cart);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <header className={styles.header}>
        <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shopping">Shopping</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </nav>
      </header>
      <main>
        <Outlet context={{ handleCartData, cart }}/>
      </main>
    </QueryClientProvider>
  )
}

export default App
