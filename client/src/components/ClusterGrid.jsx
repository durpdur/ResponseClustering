import { Box, Typography, Grid, Stack } from "@mui/material";
import Cluster from "./Cluster/Cluster";
import AddIcon from '@mui/icons-material/Add';

function ClusterGrid({ clusters, setClusters, addCluster }) {


    return (
        <Grid container 
            spacing={{ xs: 2, md: 3 }} 
            columns={{ xs: 1, sm: 4, md: 8, lg: 12}} 
            sx={{ margin: "5vw" }}
        >
            {/* Add Cluster Button */}
            {/* <Grid size={{xs: 2, sm: 4, md: 4}}>
                    <Box 
                        onClick={addCluster}
                        sx={{
                            minHeight: "20vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px dashed #e2e2e2", 
                            color: '#e2e2e2',
                            borderRadius: "6px", 
                            padding: "1em",
                            '&:hover': {
                                borderColor: 'black',
                                color: 'black',
                            }
                        }}
                    >
                        <Stack 
                            direction={"row"} 
                            sx={{alignItems: "center"}}>
                            <AddIcon/><Typography variant="h5" >Add Cluster</Typography>
                        </Stack>
                    </Box>
            </Grid> */}
            
            {/* Cluster mapping */}
            {clusters.map((c, index) => (
                <Grid key={index} size={{xs: 2, sm: 4, md: 4}}>
                    <Cluster
                        title={c.cluster_id}
                        representative_mediod={c.representative_medoid_item}
                        other_items={c.other_items_in_cluster}
                        query={c.query}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default ClusterGrid