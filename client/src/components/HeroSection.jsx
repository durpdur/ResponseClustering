import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function HeroSection({ clusterQuery, setClusterQuery }) {
  return (
    <Box
      sx={{
        backgroundColor: "primary.light",
        color: "primary.contrastText",
        minHeight: "55vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "center",
        textAlign: "left",
        padding: "10vw",
      }}
    >
        <Typography variant="h3">
            Find response cluster
        </Typography>
        <Typography variant="subtitle1" sx={{color: "black", fontWeight: "100", margin: "1em 0em"}}>
            Search through clusters by name
        </Typography>

      <Stack direction="row" spacing={1} alignContent={"center"}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="normal"
          sx={{
            backgroundColor: "white",
            minWidth: "25em",
            maxWidth: "30vw",
          }}

          value={clusterQuery}
          onChange={(inputVal) => setClusterQuery(inputVal.target.value)}
        />
        <Button 
          variant="contained"
          sx={{
            maxHeight: "4em",
            minWidth: "7em",
            borderRadius: "36px",
          }}
        ><SearchIcon/> Search</Button>
      </Stack>
    </Box>
  );
}

export default HeroSection