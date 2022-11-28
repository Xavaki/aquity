import React, { useState } from 'react';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import NavBar from './NavBar';
import MapView from './Map';
import MapSynthetic from './MapSynthetic';

let theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        modal: {
          root: {
            inset: false
          }
        }
      }
    }
  },
  palette: {
    primary: {
      main: "#0899c2"
    },
    info: {
      main: "#db2425"
    },
    santmarti: {
      main: "#71aa8b",
      contrastText: "whitesmoke"
    }
  },
  typography: {
    fontFamily: [
      '"Inter", monospace',
    ].join(','),
    body1: {
      color: "rgb(112,112,112)",

    },
    body2: {
      fontSize: "20px"
    },
    body3: {
      fontSize: "15px",
      color: "rgb(112,112,112)",
      fontFamily: [
        '"Inter", monospace',
      ].join(','),
    },
    h1: {
      fontWeight: "600",
      color: "rgb(112,112,112)",
      fontSize: "48px"
    },
    h2: {
      fontWeight: "500",
      color: "rgb(112,112,112)",
      fontSize: "40px"
    },
    h6: {
      fontWeight: "500",
      color: "rgb(112,112,112)",
    },
    h4: {
      fontWeight: "600",
      color: "black"
    },
    caption: {
      color: "rgb(112,112,112)",
    },
    button: {
      color: "rgb(112,112,112)",
      fontFamily: '"Inter", monospace',
    }
  },
});
theme = responsiveFontSizes(theme);

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Routes>
            <Route element={<Outlet />}>
              <Route path="/" element={<Home />} />
              <Route path="/sintetic/" element={<Synthetic />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>

  )
}

const Home = () => {
  let [officesLoading, setOfficesLoading] = useState(true);
  return (
    <div style={{ height: window.innerHeight, width: window.innerWidth }}>
      <NavBar officesLoading={officesLoading} />
      <Box sx={{ height: "100%", width: "100%", m: 0, pr: "50px" }}>
        <MapView setOfficesLoading={setOfficesLoading} />
      </Box>
    </div>
  )
}

const Synthetic = () => {
  let [officesLoading, setOfficesLoading] = useState(true);
  return (
    <div style={{ height: window.innerHeight, width: window.innerWidth }}>
      <NavBar officesLoading={officesLoading} />
      <Box sx={{ height: "100%", width: "100%", m: 0, pr: "50px" }}>
        <MapSynthetic setSynthDataLoadning={setOfficesLoading} />
      </Box>
    </div>
  )
}

export default App;