import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create, update } from "../store/wallet";

import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";

initTE({ Modal, Ripple });

export default function Wallet () {

    const dispatch = useDispatch(); 

    const session = useSelector(state => state.session.user);

    const [toggle, setToggle] = useState(false);
    const [openWallet, setOpenWallet] = useState(false);

    const [accountType, setAccountType] = useState()
    const [amount, setAmount] = useState()

    const wallet = useSelector(state => state.wallet)

    const deposit = async function (e) {
        e.preventDefault();
        const response = await dispatch(create({userId:session.id, accountType, amount}))
        const data = response.json()
        if (data.status == "OK") {
            console.log(data)
        } else {
            console.log('error', data)
        }
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
            <div className={`bg-white transition-translate ease-in duration-[0.5s] ${openWallet ? 'translate-y-0  absolute top-0 right-0  h-full w-[100vw] z-[100]' : ' translate-y-[100vh]'}  `}>
                <div className={`${openWallet ? '' : ' hidden'}`}>
                    <button className="absolute right-20 top-10 text-8xl z-[200] cursor-pointer " onClick={() => setOpenWallet(false)}>X</button>
                    <div className="relative w-full h-full flex justify-center items-center ">
                        <div className="text-8xl  border h-[600px] w-[500px] bg-white mt-40"> 
                            <div className="mx-4 mt-20 text-base">
                                <div className="text-2xl mb-16"> Transfer Money

                                </div>
                                <form onSubmit={deposit}>
                                    <label>
                                        <select onChange={(e) => setAccountType(e.target.value)} className="w-full p-4 mb-10" required>
                                            <option value=''>-- select account type --</option>
                                            <option value='dollars'>dollars (USD)</option>
                                            <option value='btc'>BTC</option>
                                        </select>
                                    </label>
                                    <label> amount
                                        <input onChange={e => setAmount(e.target.value)} min={0} max={100000} type="number" className="w-full  border p-2 " required/>
                                    </label>
                                    <div className="text-center mt-10">
                                        <div className="text-gray-400">Daily deposit limit: $100,000</div>
                                        <button className={`mt-4 py-4 px-16  text-base rounded-full font-extrabold text-white ${amount ? 'bg-green-400' : 'bg-gray-400 disabled:'}`}>Review Transfer</button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}