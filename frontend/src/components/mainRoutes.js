import React from "react";
import { Route,  Routes  } from 'react-router-dom'

import TickerForm from './tickerForm';
import NavBar from './navBar';
import Ticker from '../pages/Ticker';
import { useSelector } from "react-redux";
import Home from "../pages/Home";

import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'


export default function MainRoutes ({isLoaded}) {

    const session = useSelector(state => state.session.user);

    return (    
        <>      
        <NavBar />
        <Routes>
            <Route  path='/' element={<> <Home isLoaded={isLoaded} /></>} />
            {/* <Route  path='/ticker/:ticker' element={<Ticker /> } /> */}
        </Routes>
        </>

    )
}