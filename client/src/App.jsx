import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <h1>Hello</h1>
    </>
  )
}

export default App
