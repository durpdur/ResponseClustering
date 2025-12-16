import styles from "./CollapsiblePanel.module.css"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import FlowGraph from '../FlowGraph/FlowGraph';

function CollapsiblePanel({ clusters, isPanelClosed, setIsPanelClosed, focusedClusterId }) {

  return (
    <div className={`${styles.wrapper} ${isPanelClosed ? styles.hide_graph : ""}`} >
      <div className={styles.inner}>
        <div 
          className={`${styles.collapse_button} ${isPanelClosed ? styles.change_collapse_button : ""}`}
          onClick={() => setIsPanelClosed(!isPanelClosed)}
        >
          <div className={`${styles.arrow_icon} ${isPanelClosed ? styles.change_arrow_icon : ""}`}>
            <KeyboardDoubleArrowRightIcon/>
          </div>
        </div>

        <div className={styles.graph}>
          <FlowGraph clusters={clusters} focusedClusterId={focusedClusterId}/>
        </div>
      </div>
    </div>
  );
}

export default CollapsiblePanel;