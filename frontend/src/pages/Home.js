import react, { useState, useEffect, useRef } from 'react';
import { useIntersection } from 'use-intersection';


import { VictoryChart, VictoryAxis, VictoryLine, VictoryGroup, VictoryContainer } from 'victory';
import ControlPanel from '../components/controlPanel';
import Wallet from '../components/wallet';
import Ticker from './Ticker';
import SidePanel from '../components/sidePanel';
import { useSelector,useDispatch } from 'react-redux';
import { csrfFetch } from '../store/csrf';
import Cookies from 'js-cookie';

import { wallets } from '../store/wallet'
import { stocks } from '../store/stock'
// import { fetchMultipleTickers } from '../store/multiple';

import { SplashPage } from './SpalshPage';


export default function Home ({isLoaded, openWallet, setOpenWallet, stocksData, total, current, list, investingPriceRef}) {
    const dispatch = useDispatch();
    const session = useSelector(state => state?.session?.user)
    // const ref = useRef();



    // const [data, setData] = useState({})

    // const [list, setList] = useState([]);
    // const [orig, setOrigi] = useState({});
    // const [once, setOnce] = useState(true)
    // const [avg, setAvg] = useState(0)
    // const [current, setCurrent] = useState(0)
    // const [total, setTotal] = useState(0)

    // console.log(list)

    
    // const stocksData = useSelector(state => state?.stock?.stock)
    // const stocksMark = useSelector(state => state?.stock?.mark)
    const data = useSelector(state => state?.multiple?.multiple)

    // const today = new Date();
    // var todaysDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay();
    // var dayBefore =  new Date(today.setDate(today.getDate()-2)).toISOString().split('T')[0]
    
    // var dayCounter = function(days) {
    //     return new Date(today.setDate(today.getDate()-days)).toISOString().split('T')[0]
    // }

    const unused = []

    useEffect(() => {
       
        // setData(data)
        // return data
        
        // async function run() {
        //     // console.log('thisisrunning')
        //     let response
        //     try{
        //         response = await csrfFetch('/api/ticker/search/multiple', {
        //             method: 'POST',
        //             'Content-type': 'application/JSON',
        //             body: JSON.stringify({
        //                 symbols: stocksData?.map(stock => stock?.ticker),
        //                 to: dayBefore,
        //                 from: dayCounter(350),
        //             })
        //         })
        //     } catch(err) {
        //         console.log(err)
        //     }
        //     const data = await response.json()
        //     console

        //     // setData(data)

        //     // return data
        // }
        // run()

        console.log('thjisisrunning-=--------------------', stocksData)
        
        
        // if (stocksData?.length > 0&&once) {
            // run()
            // .then((data) => original(data))
            // .then((data) => complete(data))
            // .then(entries => currentPrice(entries, orig))
            // .catch(err => console.log(err))
            
            // setOnce(false)
        // }
    }, [stocksData])




    return (
        <>
            {session?.id&&<>
                <div className='max-w-[1440px] mx-auto'> 
                    <div className='grid md:grid-cols-[75%,25%] md:px-6'>
                        <div className='md:mr-8'> {/* // may change */}
                        <h1 className={`mt-0 md:mt-8 text-2xl md:text-4xl ml-5 md:ml-0`}>
                            <div className='md:hidden mb-1'>
                                Investing
                            </div>
                            ${(total)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </h1>
                        <div ref={investingPriceRef} className={` md:text-xl ml-5 md:ml-0 ${current > 0? 'text-green-500' : 'text-red-500'}`}>
                            {current > 0 && '+'}${(current).toFixed(2)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        {!openWallet&&<>
                            <div className='hidden md:block z-1'>
                                <VictoryChart height={200}  padding={{ top: 50, bottom: 50, right: 0, left: 0 }} >
                                    <VictoryGroup  data={stocksData ? list : unused}  y="close" x="none"  >
                                        <VictoryAxis  offsetY={100} tickFormat={() => ''} style={{ axis: {stroke: '#ffffff', strokeWidth: 1 }}}  />
                                        <VictoryLine style={{ data: {stroke: `${current > 0 ? "#22c55e" : "#ef4444"}  `, strokeWidth: 1 }}}  />
                                        {/* <VictoryScatter /> */}
                                    </VictoryGroup>
                                </VictoryChart>
                            </div>
                            <div className='md:hidden'>
                                <VictoryChart 
                                            height={400} 
                                            padding={{ top: 50, bottom: 50, right: 0, left: 0 }} 
                                            containerComponent={
                                                <VictoryContainer 
                                                    style={{
                                                        userSelect:'auto',
                                                        touchAction: 'auto'
                                                    }}
                                                />
                                            }
                                        >
                                    <VictoryGroup  data={stocksData ? list : unused}  y="close" x="none"  >
                                        <VictoryLine style={{ data: {stroke: `${current > 0 ? "#22c55e" : "#ef4444"}  `, strokeWidth: 2 }}}  />
                                        <VictoryAxis  offsetY={200} tickFormat={() => ''} style={{ axis: {stroke: '#ffffff', strokeWidth: 1 }}}  />
                                    </VictoryGroup>
                                </VictoryChart>
                            </div>
                        </>}
                            <Wallet openWallet={openWallet} setOpenWallet={setOpenWallet}/>
                
                        </div>

                        {!openWallet&&<div>
                            <SidePanel list={list} data={data} />
                        </div>}
                        
                    </div>
                </div>            
            </>}
            {!session?.id&&!isLoaded&&<>
                <SplashPage />
            </>}
        </>
    )
};