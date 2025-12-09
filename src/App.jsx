import React,{ useState } from 'react'
import './App.css'
import { Outlet,Link } from "react-router";
import styles from './styles.module.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <header className={styles.header}>
        <nav>
          <li>
            <Link to="/home">Home</Link>
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
        <Outlet/>
      </main>
    </QueryClientProvider>
  )
}

export default App
