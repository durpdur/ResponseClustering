import { Handle, Position } from '@xyflow/react';
// import styles from './ColorNode.module.css'

function ColorNode({ data }) {
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
      <Handle type="target" position={Position.Top}     id="target_top" />
      <Handle type="target" position={Position.Bottom}  id="target_bottom"/>
      <Handle type="target" position={Position.Right}   id="target_right" />
      <Handle type="target" position={Position.Left}    id="target_left" />

      <Handle type="source" position={Position.Top}     id="source_top" />
      <Handle type="source" position={Position.Bottom}  id="source_bottom" />
      <Handle type="source" position={Position.Right}   id="source_right" />
      <Handle type="source" position={Position.Left}    id="source_left" />
      {data.label}
    </div>
  );
}

export default ColorNode