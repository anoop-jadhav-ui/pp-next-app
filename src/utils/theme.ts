import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "poppins",
  },
  palette: {
    primary: {
      main: "#8b5cf6",
    },
    secondary: {
      main: "#D0F65C",
    },
    text: {
      primary: "#131117",
    },
    background: {
      default: "#f7f6f8",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          textTransform: "capitalize",
        },
      },
    },
  },
});
