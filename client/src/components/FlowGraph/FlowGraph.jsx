import { ReactFlow, Background, Controls } from '@xyflow/react';
import styles from "./FlowGraph.module.css"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useState } from 'react';

function FlowGraph() {
  const [isClosed, setIsClosed] = useState(true);

  return (
    <div className={`${styles.wrapper} ${isClosed ? styles.hide_graph : ""}`} >
      <div className={styles.inner}>
        <div 
          className={`${styles.collapse_button} ${isClosed ? styles.change_collapse_button : ""}`}
          onClick={() => setIsClosed(!isClosed)}
        >
          <div className={`${styles.arrow_icon} ${isClosed ? styles.change_arrow_icon : ""}`}>
            <KeyboardDoubleArrowRightIcon/>
          </div>
        </div>

        <div className={styles.graph}>
          <ReactFlow>
            <Background bgColor="white" />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default FlowGraph;