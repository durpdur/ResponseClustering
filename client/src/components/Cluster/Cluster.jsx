import { Box, Typography, Stack } from "@mui/material";
import logo from "../../assets/logo.svg"
import HoverCard from "../HoverCard/HoverCard";
import styles from "./Cluster.module.css";

function Cluster({ title, representative_mediod, other_items, query }) {
    return (
        <Box
            className={styles.wrapper}
            sx={{
                minHeight: "20vh",
                border: "1px solid #e2e2e2", 
                borderRadius: "6px", 
                padding: "1em",
                '&:hover': {
                    borderColor: 'black',
                }
            }}
        >
            <Stack 
                direction="row"
                sx={{marginBottom: "0.8em"}}
            >
                <img src={logo} alt="cluster_logo" style={{width: 32,}}/>
                <Typography 
                    variant="h6"
                    sx={{ paddingLeft: "0.3em", }}
                >
                    {title}
                </Typography>
            </Stack>

            <Typography variant="body2" fontWeight={100}>
                {representative_mediod.prompt} : {representative_mediod.result}
            </Typography>

            {/* Other items in cluster mapping */}    
            {other_items && other_items.length > 0 && (
                <Box sx={{ marginTop: "0.5em" }}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                        Clustered Items:
                    </Typography>

                    {other_items.map((item, i) => (
                        <Typography
                        key={i}
                        variant="body2"
                        fontWeight={100}
                        sx={{ ml: 1 }}
                        >
                            • {item.prompt} : {item.result}
                        </Typography>
                    ))}
                </Box>
            )}

            <div className={styles.hoverCardWrapper}>
                <HoverCard
                    title={title}
                    representative_mediod={representative_mediod}
                    other_items={other_items}
                    query={query}
                />
            </div>
        </Box>
    )
}

export default Cluster