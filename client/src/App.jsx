import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <HeroSection/>
      <h1>weiongeiowoiwngioeninioewngiowengioewioneoiwnwi</h1>
    </>
  )
}

export default App
