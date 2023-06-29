import React, { useState } from "react";
import { Route,  Routes  } from 'react-router-dom'

import TickerForm from './tickerForm';
import NavBar from './navBar';
import Ticker from '../pages/Ticker';
import { useSelector } from "react-redux";
import Home from "../pages/Home";

import NavBarMobile from "./navBar-mobile";

import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'


export default function MainRoutes ({isLoaded, showMenu, setShowMenu, stocksData, total, current, list, investingPriceRef})  {

    const [openWallet, setOpenWallet] = useState(false); 

    const session = useSelector(state => state.session.user);

    return (    
        <>      
        <NavBar showMenu={showMenu} setShowMenu={setShowMenu} total={total} investingPriceRef={investingPriceRef}/>
        <Routes>
            <Route  path='/' element={<> <Home openWallet={openWallet} setOpenWallet={setOpenWallet} isLoaded={isLoaded} stocksData={stocksData} total={total} current={current} list={list} investingPriceRef={investingPriceRef}/></>} />
            {/* <Route  path='/ticker/:ticker' element={<Ticker /> } /> */}
        </Routes>
        <NavBarMobile  openWallet={openWallet} setOpenWallet={setOpenWallet} showMenu={showMenu} setShowMenu={setShowMenu} />
        </>

    )
}