import { ReactFlow, Background, Controls } from '@xyflow/react';
import { useMemo } from 'react';

import ColorNode from './ColorNode/ColorNode';

// CUSTOM NODE COMPONENT LOGIC
const nodeTypes = {
  colorNode: ColorNode,
};

/********************
COLOR STYLING LOGIC 
*********************/
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


/*********************
CLUSTER POSITION LOGIC
**********************/

function clusterPositionGridLayout(clusterIndex, numOfClusters) {
  const COL_SPACING = 800;
  const ROW_SPACING = 800;
  
  const GRID_SIZE = Math.ceil(Math.sqrt(numOfClusters));

  const medoidX = clusterIndex % GRID_SIZE * ROW_SPACING;
  const medoidY = Math.floor(clusterIndex / GRID_SIZE) * COL_SPACING;

  return [medoidX, medoidY];
}

function otherItemPositionRadialLayout(medoidX, medoidY, RANDOM_STARTING_POS, itemIndex, numOfOtherItems) {
  const MAX_RADIUS = 250;
  const MIN_RADIUS = 150;
  const RADIUS = MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) * Math.random();
  const ANGLE_SEG = 2 * Math.PI / numOfOtherItems;

  const angle = RANDOM_STARTING_POS + itemIndex * ANGLE_SEG;
  const itemX = medoidX + Math.sin(angle) * RADIUS;
  const itemY = medoidY + Math.cos(angle) * RADIUS;

  return [itemX, itemY];
}



// REACT COMPONENT
function FlowGraph({ clusters }) {
  const nodes = useMemo(() => {
    const numOfClusters = clusters.length; // Total number of clusters based off of medoid

    return clusters.flatMap((c, clusterIndex) => {
      const clusterColor = queryToPastelColorHash(`${c.cluster_id}-medoid`);
      const [medoidX, medoidY] = clusterPositionGridLayout(clusterIndex, numOfClusters);
      const numOfOtherItems = c.other_items_in_cluster.length;
      const RANDOM_RADIAL_ROTATION = Math.random() * Math.PI;

      const medoidNode = {
        id: `${c.cluster_id}-medoid`,
        type: 'colorNode',
        data: {
          label: `${c.representative_medoid_item.prompt}`,
          color: clusterColor,
          isMedoid: true,
        },
        position: {x: medoidX, y: medoidY},
      }

      const itemNodes = c.other_items_in_cluster.map((item, itemIndex) => {
        const [itemX, itemY] = otherItemPositionRadialLayout(medoidX, medoidY, RANDOM_RADIAL_ROTATION, itemIndex, numOfOtherItems)
        return {
          id: `${c.cluster_id}-item${itemIndex}`,
          type: 'colorNode',
          data: {
            label: item.prompt,
            color: clusterColor,
          },
          position: {x: itemX, y: itemY},
        };
      });

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