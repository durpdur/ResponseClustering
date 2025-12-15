import styles from './ColorNode.module.css'

function ColorNode({ data }) {
  return (
    <div
        className={data.isMedoid ? "" : `${styles.floating}`}
        style={{
            "--delay": `${Math.random() * 2}s`,
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

export default ColorNode