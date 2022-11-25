import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useState, useEffect, createContext } from "react";
import Header from "../components/Header/Header";
import Theme from "../components/Theme/Theme"
import AnalyticsWrapper from '../components/analytics/analytics';

export const ThemeContext = createContext(false);
interface Param {
  callback: () => void;
}
export const UpdateThemeContext = createContext<any>(null);

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
let defaultMuiTheme = createTheme({
  palette: {
    mode: 'dark',
    success: {
      main: "#66e3c4",
      light: "red",
    },
  },
});

const defaultTheme = "light";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(defaultTheme);
  const [muiTheme, setMuiTheme] = useState(defaultMuiTheme)

  useEffect(() => {
    let theme = localStorage.getItem("theme") || defaultTheme;
    setTheme(theme);
  }, []);

  

  const MUILightthemeConfig = {
    // palette values for light mode
    primary:  {main: '#120b1f'},
    text: {
      primary: '#120b1f',
      secondary: '#120b1f',
    },
    background: { paper: '#f9f5fa'}
  }
  const MUIDarkthemeConfig = {
    // palette values for light mode
    primary: {main: '#eaeaf5'},
    text: {
      primary: '#eaeaf5',
      secondary: '#2c1952',
    },
    background: { paper: '#120b1f'}
  }

  useEffect(()=>{
    setMuiTheme(createTheme({
      palette: {
        mode: theme as PaletteMode,
        success: {
          main: "#482581",
          light: "red",
        },
        ...(theme==='light'?MUILightthemeConfig: MUIDarkthemeConfig)
      }
    }))
  },[theme])

  




  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  }
  return (
    <div className="parent_container">
    <ThemeContext.Provider value={theme === "light"}>
      <UpdateThemeContext.Provider value={toggleTheme}>
        <ThemeProvider theme={muiTheme}>
        <Theme theme={theme} />
        <Header />
          <Component {...pageProps} />
          <AnalyticsWrapper />
        </ThemeProvider>
      </UpdateThemeContext.Provider>
    </ThemeContext.Provider>
    </div>
  );
}
