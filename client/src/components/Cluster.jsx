import { Box, Typography, Stack } from "@mui/material";
import logo from "../assets/logo.svg"

function Cluster({ title }) {
    return (
        <Box 
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

            <Typography variant="body2" fontWeight={100}>Cluster description goes here</Typography>
        </Box>
    )
}

export default Cluster