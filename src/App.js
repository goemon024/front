
import React from 'react';
import './App.css';

import Main from './components/Main';
import Test from './components/Test';

import { createTheme, ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import indigo from "@mui/material/colors/indigo";

import { Routes, Route } from 'react-router-dom';
import MainPage from './components/Main';
import Login from './components/Login';

import WordList from './components/WordList';
import WordReview from './components/WordReview';
import Memo1List from './components/Memo1List';
import Memo1Review from './components/Memo1Review';
import Memo2List from './components/Memo2List';
import Memo2Review from './components/Memo2Review';

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
    <MuiThemeProvider theme={theme}>
    <DataProvider>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/word" element={<WordList />} />
        <Route path="/word/review" element={<WordReview />} />
        <Route path="/memo1" element={<Memo1List />} />
        <Route path="/memo1/review" element={<Memo1Review />} />
        <Route path="/memo2" element={<Memo2List />} />
        <Route path="/memo2/review" element={<Memo2Review />} />

        <Route path="/" element={<Login />} />
      </Routes>
    </DataProvider>
    </MuiThemeProvider>
  );
}

export default App;
