import { useState, useMemo } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ClusterGrid from './components/ClusterGrid'

function App() {
  const [clusters, setClusters] = useState(Array.from({ length: 5 }, (_, i) => i));
  const [clusterQuery, setClusterQuery] = useState("");

  const filteredClusters = useMemo(() => {
    const q = clusterQuery.trim();

    if (!q) return clusters;

    return clusters.filter((n) => n.toString().includes(q));
  }, [clusters, clusterQuery]);

  return (
    <>
      <Navbar/>
      <HeroSection clusterQuery={clusterQuery} setClusterQuery={setClusterQuery}/>
      <ClusterGrid clusters={filteredClusters} setClusters={setClusters}/>
    </>
  )
}

export default App
