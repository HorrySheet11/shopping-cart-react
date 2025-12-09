import React,{ useState } from 'react'
import './App.css'
import { Outlet,Link } from "react-router";
import styles from './styles.module.css';


function App() {

  return (
    <>
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
    </>
  )
}

export default App
