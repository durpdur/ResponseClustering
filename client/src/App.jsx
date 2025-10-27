import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ClusterGrid from './components/ClusterGrid'

function App() {
  const [clusters, setClusters] = useState(Array.from({ length: 5 }, (_, i) => i));

  return (
    <>
      <Navbar/>
      <HeroSection/>
      <ClusterGrid clusters={clusters} setClusters={setClusters}/>
    </>
  )
}

export default App
