import { Env } from "../environments/env";
import React from "react";
import "../styles/globals.scss";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import red from "@material-ui/core/colors/red";
import useLocalStorage from "../components/useLocalStorage";
import Footer from "../components/Footer";
import "../styles/Calendar.css";

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
  const [userLogin, setUserLogin] = useLocalStorage("userData");

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
        <div className="content_display">
          <Component
            {...pageProps}
            env={env}
            openNav={openNav}
            setOpenNav={e => {
              setOpenNav(e);
            }}
            userLogin={userLogin}
            setUserLogin={data => {
              setUserLogin(data);
            }}
          />
        </div>

        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
