import react from 'react';
import { FaCircle, FaPowerOff, FaAddressCard, FaLaptop, fan } from "react-icons/fa";


export default function NavBarMobile () {
    return (
        <>
            <div className=' md:hidden sticky bottom-0 py-10 bg-white'>
                <div className='flex justify-around'>
                    <FaPowerOff />
                    <FaLaptop />
                    <FaAddressCard />
                </div>
            </div>
        </>
    )
}