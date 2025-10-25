import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#c0e3ff',
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
  
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});

export default theme;