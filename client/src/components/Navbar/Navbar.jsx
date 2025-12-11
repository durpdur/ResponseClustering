import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import logo from "../../assets/logo.svg"
import styles from "./Navbar.module.css"

function Navbar() {
  return (
    <>    
      <AppBar className={styles.app_bar}>
        <Toolbar>
          <img
            src={logo}
              alt="Response Clustering logo"
              style={{ width: 64, height: 64, marginRight: 8, zIndex: 1 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Response Clustering
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button color="inherit">Research</Button>
            <Button color="inherit">Documentation</Button>
            <Button color="inherit">Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar;