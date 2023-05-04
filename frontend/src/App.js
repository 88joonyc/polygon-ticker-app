import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Routes  } from 'react-router-dom'

import TickerForm from './components/tickerForm';
import NavBar from './components/navBar';
import Ticker from './pages/Ticker';
import LoginPage from './pages/LoginPage';
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<> <TickerForm /></>} />
        <Route path='/ticker/:ticker' element={<Ticker /> } />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
