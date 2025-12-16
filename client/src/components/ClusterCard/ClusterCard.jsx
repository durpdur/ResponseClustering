import { Box, Typography, Stack } from "@mui/material";
import logo from "../../assets/logo.svg"
import HoverCard from "../HoverCard/HoverCard";
import styles from "./ClusterCard.module.css";

function ClusterCard({ other_items, cluster, cardIndex }) {
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
                    {cluster.cluster_id}
                </Typography>
            </Stack>

            <Box display="flex" alignItems="center">
                <Typography variant="body2" fontWeight={600} sx={{ mr: 1 }}> {"query:"} </Typography>
                <Typography variant="body2" fontWeight={100}>{cluster.query}</Typography>
            </Box>

            <Box sx={{ marginTop: "0.5em" }}>
                <Typography variant="body2" fontWeight={600}>representative_medoid:</Typography>
                <Typography variant="body2" fontWeight={100}>
                    <strong>{cluster.representative_medoid_item.prompt}</strong> : {cluster.representative_medoid_item.result}
                </Typography>
            </Box>
            

            {/* Other items in cluster*/}    
            {cluster.other_items_in_cluster && cluster.other_items_in_cluster.length > 0 && (
                <Box sx={{ marginTop: "0.5em" }}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                        other_items_in_cluster:
                    </Typography>

                    {cluster.other_items_in_cluster.map((item, i) => (
                        <Typography
                        key={i}
                        variant="body2"
                        fontWeight={100}
                        sx={{ ml: 1 }}
                        >
                            - <strong>{item.prompt}</strong> : {item.result}
                        </Typography>
                    ))}
                </Box>
            )}

            <div className={styles.hoverCardWrapper}>
                <HoverCard/>
            </div>
        </Box>
    )
}

export default ClusterCard