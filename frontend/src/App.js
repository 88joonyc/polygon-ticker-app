import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Routes  } from 'react-router-dom'

import * as sessionActions from "./store/session";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainRoutes from './components/mainRoutes';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <MainRoutes /> } />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
