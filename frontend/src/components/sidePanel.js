import react, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { csrfFetch } from '../store/csrf';
import { VictoryChart, VictoryArea, VictoryAxis, VictoryLine, VictoryGroup, VictoryScatter } from 'victory';

export default function SidePanel ({data, list}) {

    // const [data, setData] = useState({});

    const stocks = useSelector(state => state.stock.stock)
    // const today = new Date();
    // var todaysDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay();
    // var dayBefore =  new Date(today.setDate(today.getDate()-2)).toISOString().split('T')[0]
    
    // var dayCounter = function(days) {
    //     return new Date(today.setDate(today.getDate()-days)).toISOString().split('T')[0]
    // }

    // useEffect(() => {
    //     async function run() {
    //         let response
    //         try{
    //             response = await csrfFetch('http://localhost:5314/api/ticker/search/multiple', {
    //                 method: 'POST',
    //                 'Content-type': 'application/JSON',
    //                 body: JSON.stringify({
    //                     symbols: stocks?.map(stock => stock.ticker),
    //                     to: dayBefore,
    //                     from: dayCounter(1),
    //                 })
    //             })
    //         } catch(err) {
    //             console.log(err)
    //         }
            
    //         const data = await response.json()
    //         setData(data)

            
    //     }
        
    //     if (stocks.length > 0) {
    //         run()
    //     }
    // }, [stocks])
    

    return (
        <>
            <div className='border h-[90vh]' >
                <div className='w-full border-b p-4 '>
                    <div className='w-full '>Stocks</div>
                </div>
                <div>
                    {stocks&&data&&stocks?.map(stock => (
                        <>
                            <div className={`p-4 flex justify-between ${data?.[stock?.ticker]?.[0]?.close > stock.originalPrice ? 'text-green-500' : 'text-red-500' }`}>
                                <div className='flex flex-col'>
                                    <span>{stock.ticker}</span>
                                    <span>{stock.qty}</span>
                                </div>
                                <div className='h-16'>
                                    {console.log(list)}
                                <VictoryChart >
                                    {/* <VictoryArea data={data.AMZN} style={{ data: {fill: "#280137" }}} y="close" /> */}
                                    {/* <VictoryLine data={list}  style={{ data: {stroke: "#280137" }}} y="close" /> */}
                                    {/* <VictoryLine data={data.AAPL}  style={{ data: {stroke: "#280137" }}} y="close" /> */}
                                    <VictoryGroup     >
                                        <VictoryLine data={data?.[stock?.ticker]} y="close"  />
                                        <VictoryAxis  style={{ ticks: {stroke: "grey"} }} invertAxis offsetY={150} tickFormat={() => ''} />
                                        {/* <VictoryScatter /> */}
                                    </VictoryGroup>
                                </VictoryChart>

                                </div>
                                <div>
                                    <span>{}</span>
                                    <span>{((data?.[stock?.ticker]?.[0]?.close - stock.originalPrice)*stock.qty).toFixed(2)}</span>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}