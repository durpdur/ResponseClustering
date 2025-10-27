import { useState } from 'react'
import { Box, Typography, Grid, Stack } from "@mui/material";
import Cluster from "./Cluster";
import AddIcon from '@mui/icons-material/Add';
import theme from "../Theme.jsx";

function ClusterGrid({clusters, setClusters}) {
    // Push a cluster to start of clusters(Array)
    function addCluster () {
        const newCluster = clusters.length + 1;

        setClusters(prev => [newCluster, ...prev]);
    }

    return (
        <Grid container 
            spacing={{ xs: 2, md: 3 }} 
            columns={{ xs: 1, sm: 4, md: 8, lg: 12}} 
            sx={{ margin: "5vw" }}
        >
            <Grid size={{x: 2, sm: 4, md: 4}}>
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
            </Grid>

            {clusters.map((cluster, index) => (
                <Grid key={index} size={{x: 2, sm: 4, md: 4}}>
                    <Cluster title={`Cluster #${cluster}`}></Cluster>
                </Grid>
            ))}
        </Grid>
    );
}

export default ClusterGrid