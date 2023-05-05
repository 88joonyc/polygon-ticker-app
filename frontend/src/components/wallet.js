import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";

initTE({ Modal, Ripple });

export default function Wallet () {

    const [toggle, setToggle] = useState(false);
    const [openWallet, setOpenWallet] = useState(false);

    const wallet = useSelector(state => state.wallet)

    const deposit = function () {

    }

    return (
        <>
            <div className={`transition-[height]  linear duration-[.2s] ${toggle ? "h-[330px]" : " h-[130px]"} relative`}>
                <div className="relative ">
                    <div onClick={() =>  setToggle(!toggle)} className={`w-full h-20 py-16 border-none ${toggle ? 'text-white bg-midnightPurple ' : 'text-black bg-white'} hover:bg-midnightPurple  hover:text-white hover:cursor-pointer flex flex-col justify-center border-b`}>
                        <div className='flex mx-8 flex-col justify-between relative '>
                            <div>
                                <span className=''>{ wallet ? 'Buying Power' : 'Add Wallet'}</span>
                                {wallet&&<span className=''>xxx</span>}
                            </div>
                        </div>
                    </div>
                    <>
                        <div className={`w-full mx-auto border absolute top-[130px] border-none hover:text-black transition-[height]  linear duration-[.2s] ${toggle ? 'bg-midnightPurple   h-[200px] ' : '  h-0 ' }`}>
                            <div className={`${toggle ? 'block' : 'hidden'}`}>
                                <button onClick={() => setOpenWallet(!openWallet)} className="px-16 py-4 bg-white rounded-full ml-16 ">Deposit Funds</button>
                                <div class="space-y-2">

                                </div>

                            </div>

                        </div>
                    </>
                </div>
                {}
            </div>
            <div>

            </div>
        </>
    )

}