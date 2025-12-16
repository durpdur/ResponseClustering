import { useState, useMemo, useEffect } from 'react'
import { ReactFlowProvider } from '@xyflow/react';
import './App.css'
import '@xyflow/react/dist/style.css';

import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/HeroSection'
import ClusterGrid from './components/ClusterGrid'
import CollapsiblePanel from './components/CollapsiblePanel/CollapsiblePanel';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [clusterQuery, setClusterQuery] = useState("");
  const [clusters, setClusters] = useState([]);
  const [focusedClusterId, setFocusedClusterId] = useState(null);
  const [isCollapsiblePanelClosed, setIsCollapsiblePanelClosed] = useState(true);

  /*
    Fetch Data
    ----------
    Makes call to mockapi
    Calls json parsing logic
    Sets state
  */
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://690af3a01a446bb9cc248e2b.mockapi.io/query");
        const data = await res.json();
        const parsedClusters = parseIntoClusters(data);
        setClusters(parsedClusters);
      } finally {
        setIsLoading(false);
      }
    }
    load();
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
      <ReactFlowProvider>
        <Navbar/>
        <CollapsiblePanel
          clusters={clusters}
          isPanelClosed={isCollapsiblePanelClosed}
          setIsPanelClosed={setIsCollapsiblePanelClosed}
          focusedClusterId={focusedClusterId}
        />
        <HeroSection clusterQuery={clusterQuery} setClusterQuery={setClusterQuery}/>
        <ClusterGrid 
          clusters={filteredClusters} 
          setFocusedClusterId={setFocusedClusterId}
          isPanelClosed={isCollapsiblePanelClosed}
          setIsPanelClosed={setIsCollapsiblePanelClosed}
        />
      </ReactFlowProvider>
    </>
  )
}

export default App
