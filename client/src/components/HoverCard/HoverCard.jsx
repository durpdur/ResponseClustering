import styles from "./HoverCard.module.css";
import { Box, Typography, Stack } from "@mui/material";

function HoverCard({ title, representative_mediod, other_items, query }) {
  return (
    <div>
      <Typography component="pre">
        <strong>Query:</strong> {query}{"\n"}
        <strong>Title:</strong> {title}{"\n"}
        <strong>Mediod Item:</strong> {representative_mediod.prompt}{"\n"}
        
        <strong>Other Items:</strong>
        {other_items.map((item, i) => {
          if (i != other_items.length - 1) {
            return (
              <Typography key={i}>{"  "}{item.prompt},</Typography>
            );
          } else {
            return (<Typography key={i}>{"  "}{item.prompt}</Typography>)
          }
        })}
      </Typography>

    </div>
  );
}

export default HoverCard;
