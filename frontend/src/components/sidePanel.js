import react, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { csrfFetch } from '../store/csrf';
import { VictoryChart, VictoryArea, VictoryAxis, VictoryLine, VictoryGroup, VictoryScatter, VictoryContainer } from 'victory';
import { Link } from 'react-router-dom';

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
            <div className='border md:h-[90vh] md:mb-0 overflow-y-scroll no-scrollbar text-xs md:sticky top-[60px]' >
                <div className='w-full border-b px-5 md:px-2 py-4 '>
                    <div className='w-full '>Stocks</div>
                </div>
                <div>
                    {stocks&&data&&stocks?.map(stock => (
                        <div key={`stock-identifier-${stock.id}`}>
                            <Link to={`/ticker/${stock?.ticker}`} >
                                <div className={`px-5 md:px-2 py-1 flex justify-between hover:bg-gray-100 text-black`}>
                                    <div className='flex flex-col justify-center'>
                                        <span className='font-bold'>{stock?.ticker}</span>
                                        <span className='font-light'>{stock?.qty} share{stock?.qty > 1 ? 's' : ''}</span>
                                    </div>
                                    <div className='h-16'>
                                    <VictoryChart style={{cursor:'none'}}
                                            containerComponent={
                                                <VictoryContainer 
                                                    style={{
                                                        userSelect:'auto',
                                                        touchAction:'auto'
                                                    }}
                                                />
                                            }
                                        >
                                        {/* <VictoryArea data={data.AMZN} style={{ data: {fill: "#280137" }}} y="close" /> */}
                                        {/* <VictoryLine data={list}  style={{ data: {stroke: "#280137" }}} y="close" /> */}
                                        {/* <VictoryLine data={data.AAPL}  style={{ data: {stroke: "#280137" }}} y="close" /> */}
                                        <VictoryGroup     >
                                            <VictoryLine data={data?.[stock?.ticker]}  style={{  data: { stroke:data?.[stock?.ticker]?.[0]?.close > stock?.originalPrice  ? "#22c55e" : "#ef4444", strokeWidth: 2} }} y="close"  />
                                            <VictoryAxis  style={{ ticks: {stroke: "grey"} }} invertAxis offsetY={150} tickFormat={() => ''} />
                      
                                            {/* <VictoryScatter /> */}
                                        </VictoryGroup>
                                    </VictoryChart>

                                    </div>
                                    <div className='flex flex-col justify-center gap-2 items-center'>
                                        <div>${data?.[stock?.ticker]?.[0]?.close.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                        <div className={data?.[stock?.ticker]?.[0]?.close - stock?.originalPrice > 0 ? 'text-green-500' : 'text-red-500'}>{(data?.[stock?.ticker]?.[0]?.close - stock?.originalPrice)>0&&'+'}{(((data?.[stock?.ticker]?.[0]?.close - stock?.originalPrice))/(stock?.originalPrice)*100).toFixed(2)}%</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}