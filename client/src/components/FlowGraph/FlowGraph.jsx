import { ReactFlow, Background, Controls } from '@xyflow/react';
import { useMemo } from 'react';

// COLOR STYLING LOGIC
/*
function pastelSLForHue
  - Breakpoints for color in HSL for major color groups
  - Helps decided pastel saturation and lightness
*/
function pastelSLForHue(hue) {
  const h = ((hue % 360) + 360) % 360; // normalize just in case

  if (h >= 330 || h < 20) {                   // Red, Pink
    return { saturation: 70, lightness: 80 }; 
  } else if (h >= 20 && h < 70) {             // Yellow, Orange
    return { saturation: 90, lightness: 80 };
  } else if (h >= 70 && h < 170) {            // Green
    return { saturation: 50, lightness: 75 };
  } else if (h >= 170 && h < 260) {           // Blue, Cyan
    return { saturation: 60, lightness: 80 };
  } else {                                    // Purple, Magenta
    return { saturation: 40, lightness: 80 };
  }
}

/* 
function queryToColorHash
  - Hashes a string(query) into a CSS color string using hsl 
*/
function queryToPastelColorHash(query) {
  let hash = 0;
  for (let i = 0; i < query.length; i++) {
    hash = (hash * 31 + query.charCodeAt(i)) | 0;
  }

  const hue = Math.abs(hash) % 360;
  const { saturation, lightness } = pastelSLForHue(hue);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// CLUSTER POSITION LOGIC


// CUSTOM NODE LOGIC
/* 
  function ColorNode
    - Custom styling for nodes
*/
function ColorNode({ data }) {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "10em",
        background: data.color,
        color: "black",
        fontFamily: '"Google Sans Code", "Lato", sans-serif',
        border: data.isMedoid ? "5px solid #e2e2e2" : "1px solid #e2e2e2",
      }}
    >
      {data.label}
    </div>
  );
}

const nodeTypes = {
  colorNode: ColorNode,
};


function FlowGraph({ clusters }) {

  const nodes = useMemo(() => {
    return clusters.flatMap((c, clusterIndex) => {
      const medoidX = 0;
      const medoidY = clusterIndex * 100;

      const medoidNode = {
        id: `${c.cluster_id}-medoid`,
        type: 'colorNode',
        data: {
          label: c.representative_medoid_item.prompt,
          color: queryToPastelColorHash(`${c.cluster_id}-medoid`),
          isMedoid: true,
        },
        position: {x: medoidX, y: medoidY},
      }

      const itemNodes = c.other_items_in_cluster.map((item, itemIndex) => ({
        id: `${c.cluster_id}-item${itemIndex}`,
        type: 'colorNode',
        data: {
          label: item.prompt,
          color: queryToPastelColorHash(`${c.cluster_id}-medoid`),
        },
        position: {x: medoidX + (itemIndex + 1) * 150, y: medoidY},
      }));

      return [
        medoidNode,
        ...itemNodes
      ];
    });
  }, [clusters]);

  const handleFlowInit = (instance) => {
    instance.setViewport({x: 250, y: 400, zoom: 1});
  }

  return (
    <ReactFlow
      onInit={handleFlowInit}
      nodes={nodes}
      nodeTypes={nodeTypes}
    >
      <Background bgColor="white" />
      <Controls />
    </ReactFlow>
  );
}

export default FlowGraph;