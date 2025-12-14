import { useState, useMemo, useEffect } from 'react'
import './App.css'
import '@xyflow/react/dist/style.css';

import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/HeroSection'
import ClusterGrid from './components/ClusterGrid'
import FlowGraph from './components/CollapsiblePanel/CollapsiblePanel'
import Toolbar from '@mui/material/Toolbar';
import CollapsiblePanel from './components/CollapsiblePanel/CollapsiblePanel';

function App() {
  const [clusterQuery, setClusterQuery] = useState("");
  const [clusters, setClusters] = useState([]);

  /*
    Fetch Data
    ----------
    Makes call to mockapi
    Calls json parsing logic
    Sets state
  */
  useEffect(() => {
    fetch("https://690af3a01a446bb9cc248e2b.mockapi.io/query")
      .then(res => res.json())
      .then(data => {
        const parsedClusters = parseIntoClusters(data);
        setClusters(parsedClusters);
      });
  }, []);

  /*
    function parseIntoClusters(data)
    -------------------------------- 
    Parse API json data into below structure. Example:
    {
      {
        cluster_id: "indian",
        representative_medoid_item: { prompt: "butter chicken", result: "..."},
        other_items_in_cluster: [ ... ],
        query: "food"
      },
      ...
    }
  */
  function parseIntoClusters(data) {
    let apiClusters;
    
    if (Array.isArray(data)) {
      apiClusters = data.flatMap(d => (d?.clusters ?? []).map(cluster => ({
        ...cluster,
        query: d.query
      })));
    } else {
      apiClusters = (data?.clusters ?? []).map(cluster => ({
        ...cluster,
        query: data.query
      }));
    }
    return apiClusters;
  }

  /* 
    function addCluster()
    ---------------------
    Adds a cluster

    * Needs mock data or default data for Cluster component to render correctly
  */
  function addCluster() {
    // const newCluster = clusters.length + 1;

    // setClusters(prev => [newCluster, ...prev]);
    console.log("addCluster trigger does nothing right now!");
  }

  /* 
    Search logic
    ------------
    Filters based off of 
    - cluster_id
    - representative_medoid_item prompt
    - other_items_in_cluster prompt
    - query
  */
  const filteredClusters = useMemo(() => {
    const q = clusterQuery.trim().toLowerCase();
    if (!q) return clusters;

    return clusters.filter((c) => {
      const matchesClusterId =
        c.cluster_id.toLowerCase().includes(q);

      const matchesMedoid =
        c.representative_medoid_item?.prompt.toLowerCase().includes(q);

      const matchesOtherItems =
        c.other_items_in_cluster?.some(item =>
          item.prompt.toLowerCase().includes(q)
        );
      
      const matchesQuery = 
        c.query.toLowerCase().includes(q);

      return matchesClusterId || matchesMedoid || matchesOtherItems || matchesQuery;
    });
  }, [clusters, clusterQuery]);

  return (
    <>
      <Navbar/>
      <CollapsiblePanel clusters={clusters}/>
      <HeroSection clusterQuery={clusterQuery} setClusterQuery={setClusterQuery}/>
      <ClusterGrid clusters={filteredClusters} setClusters={setClusters} addCluster={addCluster}/>
    </>
  )
}

export default App
