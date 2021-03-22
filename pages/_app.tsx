import { Env } from "../environments/env";
import React from "react";
import "../styles/globals.scss";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import red from "@material-ui/core/colors/red";

const env: Env = require(`../environments/${process.env.mode}`);
const ThemeConfig = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  }
});

function MyApp({ Component, pageProps }) {
  const [openNav, setOpenNav] = React.useState(true);

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={ThemeConfig}>
        <CssBaseline />
        <Component
          {...pageProps}
          env={env}
          openNav={openNav}
          setOpenNav={e => {
            setOpenNav(e);
          }}
        />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
