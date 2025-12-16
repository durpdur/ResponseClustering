import { Handle, Position } from '@xyflow/react';
// import styles from './ColorNode.module.css'

function ColorNode({ data }) {
  const connectedSide = data.connectedSide;

  const styleForGivenSide = (side) => {
    if (!connectedSide) return {}; // medoid would be null
    
    if (connectedSide == side) {
      return { opacity: 1 };
    } else {
      return { opacity: 0, pointerEvents: "none" };
    }
  };

  return (
    <div
        // className={data.isMedoid ? "" : `${styles.floating}`}
        style={{
            // "--delay": `${Math.random() * 3}s`,
            padding: "10px",
            borderRadius: "10em",
            background: data.color,
            color: "black",
            fontFamily: '"Google Sans Code", "Lato", sans-serif',
            border: data.isMedoid ? "5px solid #e2e2e2" : "1px solid #e2e2e2",
        }}
    >
      <Handle type="target" position={Position.Top}     id="target_top"    style={styleForGivenSide("top")}/>
      <Handle type="target" position={Position.Bottom}  id="target_bottom" style={styleForGivenSide("bottom")}/>
      <Handle type="target" position={Position.Right}   id="target_right"  style={styleForGivenSide("right")}/>
      <Handle type="target" position={Position.Left}    id="target_left"   style={styleForGivenSide("left")}/>

      <Handle type="source" position={Position.Top}     id="source_top"    style={styleForGivenSide("top")}/>
      <Handle type="source" position={Position.Bottom}  id="source_bottom" style={styleForGivenSide("bottom")}/>
      <Handle type="source" position={Position.Right}   id="source_right"  style={styleForGivenSide("right")}/>
      <Handle type="source" position={Position.Left}    id="source_left"   style={styleForGivenSide("left")}/>

      {data.label}
    </div>
  );
}

export default ColorNode