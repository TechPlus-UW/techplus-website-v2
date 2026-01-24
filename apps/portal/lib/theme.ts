import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    secondaryYellowLight: Palette['primary'];
    secondaryYellowMedium: Palette['primary'];
    secondaryYellowDark: Palette['primary'];
    secondaryGreenLight: Palette['primary'];
    secondaryGreenDark: Palette['primary'];
  }

  interface PaletteOptions {
    secondaryYellowLight?: PaletteOptions['primary'];
    secondaryYellowMedium?: PaletteOptions['primary'];
    secondaryYellowDark?: PaletteOptions['primary'];
    secondaryGreenLight?: PaletteOptions['primary'];
    secondaryGreenDark?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#020B2C',
    },
    secondary: {
      main: '#6C9A5C',
      light: '#8BC677',
    },
    secondaryYellowLight: {
      main: '#FFDC84',
    },
    secondaryYellowMedium: {
      main: '#F9CD34',
    },
    secondaryYellowDark: {
      main: '#ECB22E',
    },
    secondaryGreenLight: {
      main: '#8BC677',
    },
    secondaryGreenDark: {
      main: '#6C9A5C',
    },
  },
  typography: {
    fontFamily: '"Poppins","Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
