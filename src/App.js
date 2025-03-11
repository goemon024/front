
import React, { useContext } from 'react';
import { DataContext } from './App';

import './App.css';

import Main from './components/Main';
import Test from './components/Test';

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import indigo from "@mui/material/colors/indigo";

import { Routes, Route } from 'react-router-dom';
import MainPage from './components/pages/Mainpage';
import Login from './components/Login';

import WordList from './components/WordList';
import WordCreate from './components/WordCreate';

import SentenceList from './components/SentenceList';

// import WordReview from './components/WordReview';
import Memo1List from './components/Memo1List';
// import Memo1Review from './components/Memo1Review';
import Memo1Create from './components/Memo1Create';
import Memo2List from './components/Memo2List';
// import Memo2Review from './components/Memo2Review';

import Memo2Create from './components/Memo2Create';
import WordMemoReview from './components/WordMemoReview';

import { DataProvider } from './context/DataContext';
import PrivateRoute from './context/PrivateRoute';

import Memo1 from './components/pages/Memo1';
import Memo2 from './components/pages/Memo2';
import Word from './components/pages/Word';

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
    // <MuiThemeProvider theme={theme}>
    // <DataProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/*"
        element={
          <DataProvider>
            <PrivateRoute>
              <Routes>
                <Route path="/mainpage" element={<MainPage />} />

                <Route path="/word" element={<Word />} />
                <Route path="/wordlist" element={<WordList />} />
                <Route path="/word/create" element={<WordCreate />} />
                <Route path="/word/review" element={<WordMemoReview selectedTable="word" />} />
                <Route path="/word/all" element={<WordMemoReview selectedTable="word" isAll={true} />} />
                <Route path="/word/checklist" element={<WordMemoReview selectedTable="word" isList={true} />} />
                <Route path="/word/calendar" element={<WordMemoReview selectedTable="word" isCalendar={true} startDate={null} endDate={null} />} />

                <Route path="/word/sentence_all" element={<WordMemoReview selectedTable="sente" isSentenceAll={true} />} />
                <Route path="/word/sentence_list" element={<WordMemoReview selectedTable="sente" isSentenceList={true} />} />

                <Route path="/word/sentence" element={<SentenceList />} />

                <Route path="/memo1" element={<Memo1 />} />
                <Route path="/memo1list" element={<Memo1List />} />
                <Route path="/memo1/create" element={<Memo1Create />} />
                <Route path="/memo1/review" element={<WordMemoReview selectedTable="memo1" />} />
                <Route path="/memo1/all" element={<WordMemoReview selectedTable="memo1" isAll={true} />} />
                <Route path="/memo1/calendar" element={<WordMemoReview selectedTable="memo1" isCalendar={true} startDate={null} endDate={null} />} />

                <Route path="/memo2" element={<Memo2 />} />
                <Route path="/memo2list" element={<Memo2List />} />
                <Route path="/memo2/create" element={<Memo2Create />} />
                <Route path="/memo2/review" element={<WordMemoReview selectedTable="memo2" />} />
                <Route path="/memo2/all" element={<WordMemoReview selectedTable="memo2" isAll={true} />} />
                <Route path="/memo2/calendar" element={<WordMemoReview selectedTable="memo2" isCalendar={true} startDate={null} endDate={null} />} />

              </Routes>
            </PrivateRoute>
          </DataProvider>
        }></Route>
    </Routes>
    // </MuiThemeProvider>
  );
}

export default App;