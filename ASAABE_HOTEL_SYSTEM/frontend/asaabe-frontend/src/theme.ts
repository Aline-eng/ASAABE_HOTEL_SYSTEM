import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0F1B2D', // Deep navy
    },
    secondary: {
      main: '#C8A45D', // Gold accent
    },
    error: {
      main: '#D64C4C',
    },
    success: {
      main: '#2FB47C',
    },
    background: {
      default: '#F6F7F9',
    },
  },
  typography: {
    fontFamily: ['Inter', 'Playfair Display', 'sans-serif'].join(','),
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    body1: { fontSize: '1rem' },
  },
});

export default theme;