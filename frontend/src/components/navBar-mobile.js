import react from 'react';
import { FaCircle, FaPowerOff, FaAddressCard, FaLaptop, FaMoneyBill } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../store/session'

export default function NavBarMobile ({openWallet, setOpenWallet, showMenu, setShowMenu}) {
    const dispatch = useDispatch();

    const href = window.location.href

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };
    

    return (
        <>
            {!openWallet&&<div className=' md:hidden sticky bottom-0 py-6 bg-white z-[100]'>
                <div className='flex justify-around'>
                    <Link to='/'>
                        <FaLaptop style={{ fontSize: '25px', color: `${ ( href === 'http://localhost:3000/') ? '#000000' : '#9f93a6'}` }} />
                    </Link>
                    <FaAddressCard style={{ fontSize: '25px', color: '#9f93a6' }} />
                    <button onClick={() => setOpenWallet(true)}>
                        <FaMoneyBill style={{ fontSize: '25px', color: `${!openWallet ? '#9f93a6' : '#000000'}` }} />
                    </button>
                    <button onClick={logout}>
                        <FaPowerOff style={{ fontSize: '25px', color: `${!showMenu ? '#9f93a6' : '#000000'}` }} />
                    </button>
                </div>
            </div>}
        </>
    )
}