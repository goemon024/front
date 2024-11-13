
import React from 'react';
import './App.css';

import Main from './components/Main';
import Test from './components/Test';


import { createTheme, ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import indigo from "@mui/material/colors/indigo";

import { DataProvider } from './context/DataContext';
// import Navbar from "./components/Navbar";  
// import DataProvider from './context/DataContext';

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
    <DataProvider>
    <div>
      <Main />
    </div>
    </DataProvider>
  );
}

export default App;
