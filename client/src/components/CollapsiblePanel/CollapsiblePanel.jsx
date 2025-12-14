import styles from "./CollapsiblePanel.module.css"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useState } from 'react';

import FlowGraph from '../FlowGraph/FlowGraph';

function CollapsiblePanel({ clusters }) {
  const [isClosed, setIsClosed] = useState(false);

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
          <FlowGraph clusters={clusters}/>
        </div>
      </div>
    </div>
  );
}

export default CollapsiblePanel;