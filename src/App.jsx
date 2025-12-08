import { useState } from 'react'
import './App.css'
import { Outlet } from "react-router";

function App() {

  return (
    <>
      <header>
        <nav>
          

        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default App
