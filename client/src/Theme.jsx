import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#e5f4ff',
      main: '#c0e3ff',
      dark: '#2554b0',
      contrastText: '#3858e9',
    },
    secondary: {
      light: '#f4e4e2',
      main: '#e39580',
      dark: '#a91400',
      contrastText: '#000',
    },
  },
  
  typography: {
    fontFamily: '"Google Sans Code", "Lato", sans-serif',
  },

  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#ffffff",
          },
        },
      },
    },
  },
});

export default theme;