import react, { useState, useEffect } from 'react';

import { VictoryChart, VictoryAxis, VictoryLine, VictoryGroup } from 'victory';
import ControlPanel from '../components/controlPanel';
import Wallet from '../components/wallet';
import Ticker from './Ticker';
import SidePanel from '../components/sidePanel';
import { useSelector,useDispatch } from 'react-redux';
import { csrfFetch } from '../store/csrf';
import Cookies from 'js-cookie';

import { wallets } from '../store/wallet'
import { stocks } from '../store/stock'
import { SplashPage } from './SpalshPage';


export default function Home ({isLoaded}) {
    const dispatch = useDispatch();
    const session = useSelector(state => state?.session?.user)

    const [data, setData] = useState({})

    const [list, setList] = useState([]);
    const [orig, setOrigi] = useState({});
    const [once, setOnce] = useState(true)
    const [avg, setAvg] = useState(0)
    const [current, setCurrent] = useState(0)
    const [openWallet, setOpenWallet] = useState(false); 
 
    const stocksData = useSelector(state => state?.stock?.stock)
    const today = new Date();
    var todaysDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay();
    var dayBefore =  new Date(today.setDate(today.getDate()-2)).toISOString().split('T')[0]
    
    var dayCounter = function(days) {
        return new Date(today.setDate(today.getDate()-days)).toISOString().split('T')[0]
    }

    const unused = []

    // console.log(session?.user)

    // useEffect(() => {
    //     dispatch(wallets(session?.id))
    //     dispatch(stocks(session?.id))  
    // }, [session])

    useEffect(() => {
        async function run() {
            console.log('thisisrunning')
            let response
            try{
                response = await csrfFetch('/api/ticker/search/multiple', {
                    method: 'POST',
                    'Content-type': 'application/JSON',
                    body: JSON.stringify({
                        symbols: stocksData?.map(stock => stock?.ticker),
                        to: dayBefore,
                        from: dayCounter(350),
                    })
                })
            } catch(err) {
                console.log(err)
            }
            const data = await response.json()
            setData(data)

            return data
        }

        const complete = function (entries, type) {
            let list = []
            for (const [idx, [key, val]] of Object?.entries(Object?.entries(entries.pass))) {
                
                for (let j = 0; j < val.length; j++) {
                    
                    if (list?.length == val?.length) {
                        list[j] = (list[j]+(val[j]?.close * entries.obj[key]?.qty  ))
                    } else {
                        list.push(val[j]?.close)
                    }
                }
            }
            setList(list.reverse())  

            return entries
        }
        
        if (stocksData?.length > 0&&once) {
            run()
            .then((data) => original(data))
            .then((data) => complete(data))
            .then(entries => currentPrice(entries, orig))
            .catch(err => console.log(err))
            
            setOnce(false)
        }
    }, [stocksData, data])
    
    const original = function (pass) {
        let obj = {}
        let sum = 0
        stocksData.forEach(tick => {
            sum += (tick.originalPrice * tick.qty)
            obj[tick.ticker]={ qty: tick?.qty, originalPrice: tick?.originalPrice, lastTotal: sum} 
        })  
        setOrigi(obj)
        setAvg(sum)
        return {pass, obj}
    };

    const currentPrice = function ({pass, obj}) {
        let current = 0
        for (const [key, val] of Object.entries(pass)) {
            current += obj[key].lastTotal - (pass[key][0].close  * obj[key].qty)
        }
        setCurrent(current)
    }

    console.log('dat----------------------------------------',data)
    console.log('loaded----------------------------------------',isLoaded)

    // if (isLoaded == null) return null
    // if (isLoaded == false) return <SplashPage />

    const token = Cookies.get('token')

    console.log(token)
    return (
        <>
            {session?.id&&<>
                <div className='max-w-[1440px] mx-auto'> 
                    <div className='grid md:grid-cols-[78%,22%] md:px-6'>
                        <div className='md:mr-8'> {/* // may change */}
                        <h1 className={`mt-8 text-2xl md:text-4xl ml-2 md:ml-0`}>
                            ${(current)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </h1>
                        <div className={`text-xl ml-2 md:ml-0 ${list[0] > avg ? 'text-green-500' : 'text-red-500'}`}>
                            ${list[0] - avg > 0 ? (list[0] - avg).toFixed(2)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
                        </div>
                        <div>

                            <VictoryChart height={200} padding={{ top: 50, bottom: 50, right: 0, left: 0 }} >
                                {/* <VictoryArea data={data.AMZN} style={{ data: {fill: "#280137" }}} y="close" /> */}
                                {/* <VictoryLine data={list}  style={{ data: {stroke: "#280137" }}} y="close" /> */}
                                {/* <VictoryLine data={data.AAPL}  style={{ data: {stroke: "#280137" }}} y="close" /> */}
                                <VictoryGroup  data={stocksData ? list : unused}  y="close" x="none"  >
                                    <VictoryLine style={{ data: {stroke: `${list[0] > avg ? "#22c55e" : "#ef4444"}  `, strokeWidth: 1 }}}  />
                                    <VictoryAxis  offsetY={100} tickFormat={() => ''} style={{ axis: {stroke: '#ffffff', strokeWidth: 1 }}}  />
                                    {/* <VictoryScatter /> */}
                                </VictoryGroup>
                            </VictoryChart>
                        </div>
                            <Wallet openWallet={openWallet} setOpenWallet={setOpenWallet}/>
                
                        </div>

                        {!openWallet&&<div>
                            <SidePanel list={list} data={data} />
                        </div>}
                        
                    </div>
                </div>            
            </>}
            {!token&&<>
                <SplashPage />
            </>}
        </>
    )
};