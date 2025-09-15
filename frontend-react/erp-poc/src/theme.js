import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#a3c4f3", // azul pastel
    },
    secondary: {
      main: "#f6a5c0", // rosa pastel
    },
    background: {
      default: "#fdf6f0", // beige muy claro
      paper: "#ffffff", // tarjetas blancas suaves
    },
    text: {
      primary: "#3b3b3b", // gris oscuro
      secondary: "#6b6b6b", // gris medio
    },
  },
  typography: {
    fontFamily: "'Sazanami Mincho', 'Roboto', sans-serif", // tu fuente japonesa favorita
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 16, // bordes redondeados estilo retro
  },
});

export default theme;