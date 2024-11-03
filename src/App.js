
import React from 'react';
import './App.css';

import Main from './components/Main';
import Test from './components/Test';


import { createTheme, ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import indigo from "@mui/material/colors/indigo";
// import Navbar from "./components/Navbar";  
// import ApiContextProvider from './context/ApiContext';

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: "Comic Neue",
  },
});

function App() {
  return (
    <div>
      <Test />
    </div>
  );
}

export default App;
