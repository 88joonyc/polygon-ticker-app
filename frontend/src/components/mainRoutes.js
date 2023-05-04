import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Routes  } from 'react-router-dom'

import * as sessionActions from "../store/session";
import TickerForm from './tickerForm';
import NavBar from './navBar';
import Ticker from '../pages/Ticker';


export default function MainRoutes () {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/ticker/:ticker' element={<Ticker /> } />
                <Route path='/' element={<> <TickerForm /></>} />
            </Routes>
        </>
    )
}