import React from "react";
import { Route,  Routes  } from 'react-router-dom'

import TickerForm from './tickerForm';
import NavBar from './navBar';
import Ticker from '../pages/Ticker';
import { useSelector } from "react-redux";
import Home from "../pages/Home";


export default function MainRoutes () {

    const session = useSelector(state => state.session.user);

    return (
        <>
            <NavBar />
            <Routes>
                {session&&<>
                    <Route path='/' element={<> <Home /></>} />
                    <Route path='/ticker/:ticker' element={<Ticker /> } />
                </>}
                <Route path='/' element={<> <TickerForm /></>} />
            </Routes>
        </>
    )
}