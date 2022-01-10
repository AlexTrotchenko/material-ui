import { createTheme } from "@mui/material/styles";
import { skSK } from "@mui/material/locale";

const darkOrange = "#de4a00";
const lightOrange = "#ff8800";
const yellow = "#fff700";

const theme = createTheme(
  {
    palette: {
      common: {
        darkOrange: `${darkOrange}`,
        lightOrange: `${lightOrange}`,
        yellow: `${yellow}`,
      },
      primary: {
        main: `${darkOrange}`,
      },
      secondary: {
        main: `${lightOrange}`,
      },
      themeYellow: {
        main: `${yellow}`,
      },
    },

    status: {
      danger: "orange",
    },
    typography: {
      tabs: {
        fontFamily: "Raleway",
        textTransform: "none",
        fontWeight: 700,
        fontSize: "1rem",
      },
    },
  },
  skSK
);
export default theme;
