import { ReactFlow, Background, Controls, useReactFlow } from '@xyflow/react';
import { useMemo, useEffect } from 'react';

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

/**********************
 CLUSTER POSITION LOGIC
***********************/
/* 
function clusterPositionGridLayout
  - Positions each medoid item in the cluster in a square grid layout
  ----------------
  RETURN:
  - [X, Y] Medoid position in an array: X, Y coordinate
*/
function clusterPositionGridLayout(clusterIndex, numOfClusters) {
  const COL_SPACING = 800;
  const ROW_SPACING = 800;
  
  const GRID_SIZE = Math.ceil(Math.sqrt(numOfClusters));

  const medoidX = clusterIndex % GRID_SIZE * ROW_SPACING;
  const medoidY = Math.floor(clusterIndex / GRID_SIZE) * COL_SPACING;

  return [medoidX, medoidY];
}

/* 
function otherItemPositionRadialLayout
  - Positions other_items_in_cluster in a radial layout around the medoid
  ----------------
  RETURN:
  - [X, Y, Angle] Item position and angle of item relative to medoid in array
*/
function otherItemPositionRadialLayout(medoidX, medoidY, RANDOM_RADIAN_STARTING_POS, itemIndex, numOfOtherItems) {
  const MAX_RADIUS = 250;
  const MIN_RADIUS = 175;
  const RADIUS = MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) * Math.random();
  const ANGLE_SEG = 2 * Math.PI / numOfOtherItems;

  const angle = (RANDOM_RADIAN_STARTING_POS + itemIndex * ANGLE_SEG) % (2 * Math.PI);
  const itemX = medoidX + Math.sin(angle) * RADIUS;
  const itemY = medoidY + Math.cos(angle) * RADIUS;

  return [itemX, itemY, angle];
}

/*********************************
 EDGE CONNECTION LOGIC
**********************************/
/* function angleToEdgeSourceTargetId
  - Maps the geometric angle to the correct handle on the Medoid (source) 
    and the Item (target).
  - Normalizes angle to 0-2PI range first
  RETURN
  - [item, medoid]
*/
function angleToEdgeSourceTargetId(angle) {
  const twoPi = 2 * Math.PI;
  const normalizedAngle = (angle % twoPi + twoPi) % twoPi;

  // Region: Bottom (approx 0 rad / 360 deg)
  // Logic: > 315 deg OR < 45 deg
  if (normalizedAngle >= 7 * Math.PI / 4 || normalizedAngle < Math.PI / 4) {
    return ["source_bottom", "target_top"];
  }

  // Region: Right (approx PI/2 rad / 90 deg)
  // Logic: 45 deg to 135 deg
  if (normalizedAngle < 3 * Math.PI / 4) {
    return ["source_right", "target_left"];
  }
  
  // Region: Top (approx PI rad / 180 deg)
  // Logic: 135 deg to 225 deg
  if (normalizedAngle < 5 * Math.PI / 4) {
     return ["source_top", "target_bottom"];
  }
  
  // Region: Left (approx 3PI/2 rad / 270 deg)
  // Logic: 225 deg to 315 deg
  return ["source_left", "target_right"];
}

/****************
 REACT COMPONENT
*****************/
function FlowGraph({ clusters, focusedClusterId }) {
  const { setCenter } = useReactFlow();

  // Parses clusters into ColorNode objects
  const { nodes, edges, clusterPositions } = useMemo(() => {
    const numOfClusters = clusters.length;

    const nodes = [];
    const edges = [];
    const clusterPositions = new Map(); // {cluster_id : [medoidX, medoidY]}

    clusters.forEach((c, clusterIndex) => {
      const numOfOtherItems = c.other_items_in_cluster.length;
      
      const medoidId = `${c.cluster_id}-medoid`;
      const clusterColor = queryToPastelColorHash(medoidId);
      const RANDOM_RADIAN_ROTATION = Math.random() * Math.PI;
      const [medoidX, medoidY] = clusterPositionGridLayout(clusterIndex, numOfClusters);

      clusterPositions.set(c.cluster_id, [medoidX, medoidY]); // Save cluster position to map
      
      // Medoid node
      nodes.push({
        id: medoidId,
        type: "colorNode",
        data: {
          label: c.representative_medoid_item.prompt,
          color: clusterColor,
          isMedoid: true,
        },
        position: { x: medoidX, y: medoidY },
      });

      /* 
      - other_items
      - edges from medoidItem -> other_items
      */ 
      c.other_items_in_cluster.forEach((item, itemIndex) => {
        const [itemX, itemY, angle] = otherItemPositionRadialLayout(medoidX, medoidY, RANDOM_RADIAN_ROTATION, itemIndex, numOfOtherItems);
        const [sourceHandleId, targetHandleId] = angleToEdgeSourceTargetId(angle);
        const connectedSide = targetHandleId.split("_")[1];

        const itemId = `${c.cluster_id}Item${itemIndex}`;
        nodes.push({
          id: itemId,
          type: "colorNode",
          data: {
            label: item.prompt,
            color: clusterColor,
            connectedSide: connectedSide,
          },
          position: { x: itemX, y: itemY },
        });

        edges.push({
          id: `${medoidId}-to-${itemId}`,
          source: medoidId,
          target: itemId,
          sourceHandle: sourceHandleId,
          targetHandle: targetHandleId,
        });
      });
    });

    return { nodes, edges, clusterPositions };
  }, [clusters]);

  // Initializes view on the first cluster
  const handleFlowInit = (instance) => {
    instance.setViewport({x: 250, y: 400, zoom: 0.9});
  }

  // Centers on cluster
  useEffect(() => {
    if (!focusedClusterId) return;

    const pos = clusterPositions.get(focusedClusterId);
    if (!pos) return;

    const [x, y] = pos;
    setCenter(x + 50, y, { zoom: 0.9, duration: 1000 });
  }, [focusedClusterId, clusterPositions, setCenter]);

  return (
    <ReactFlow
      onInit={handleFlowInit}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
    >
      <Background bgColor="white" />
      <Controls />
    </ReactFlow>
  );
}

export default FlowGraph;