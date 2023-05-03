import React, { useEffect, useState } from "react";

import { useLocation } from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { VictoryChart, VictoryArea, VictoryAxis } from 'victory';

export default function InfoPanel({ticker}) {
    var today = new Date();
    var todaysDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay();
    var dayBefore =  new Date(today.setDate(today.getDate()-2)).toISOString().split('T')[0]
    
    var dayCounter = function(days) {
        return new Date(today.setDate(today.getDate()-days)).toISOString().split('T')[0]
    }

    // const location = useLocation();
    // console.log(location)
    // const ticker = location.ticker
    
    const [multiplier, setMultiplier] = useState(1);
    const [timespan, setTimespan] = useState('day');
    const [start, setStart] = useState(dayCounter(3));
    const [end, setEnd] = useState(dayBefore);
    const [limit, setLimit] = useState(2000);
    const [sort, setSort] = useState('asc');
    const [adjusted, setAdjusted] = useState(false);

    const [dataPoints, setDataPoints] = useState([])

    const [day, setDay] = useState(2)

    const [data, setData] = useState({});
    const [meta, setMeta] = useState({});
    const [image, setImage] = useState('');
    const [news, setNews] = useState('');
    
    const headerOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_POLYGONAPISECRETEKEY}`
        }
    }

    const payload = {
        ticker,
        multiplier,
        timespan,
        start,
        end,
        limit,
        sort,
        adjusted
    }

    useEffect(() => {
        async function runme() {
            let data
            try {
                data = await fetch('http://localhost:5314/api/search', {
                    method: 'POST',
                    headers: {"Content-Type": 'application/json'},
                    body: JSON.stringify(payload)
                })
            } catch (err) {
                console.log(err)
            }
            const response = await data.json();
            if (response.status == 'OK') {
                console.log('setup error handling;', response)
                setDataPoints(response.results)
            }
        }

        async function findmeta() {
            console.log('thisishuitting')
            await Promise.all([
                fetch('http://localhost:5314/api/search', {
                    method:"POST",
                    headers: {"Content-Type": 'application/json'},
                    body: JSON.stringify(payload)
                }).then(async res => setData(await res.json()))
                  .catch(err => console.log(err)),
                fetch(`http://localhost:5314/api/ticker/details/${ticker}`)
                .then(async res => await res.json())
                .then(async returndata => {
                    setMeta(returndata);
                    const imageData = returndata?.results?.branding?.logo_url;
                    if (imageData) {
                        return fetch(imageData, headerOptions, {
                        }).then(async res => setImage(await res.text())).catch(err => console.log(err))
                        
                    }
                })
                .catch(err => console.log(err)),
                fetch(`http://localhost:5314/api/ticker/news/${ticker}`)
                .then(async res => await res.json())
                .then(data => setNews(data))
                .catch(err => console.log(err))
            ]);
        } 

        // console.log(start)
        // runme()
        findmeta()

    }, [ticker, start])

    const handleChange = function (num) {
        setDay(num)
        setStart(dayCounter(num))
    }
    return (
        <div>
            <div>
                <h1 className="text-4xl mb-4 mt-8">{meta.results?.name}</h1>
                {data.results&&(
                    <>
                        <h2 className="text-5xl">${data.results[data?.results?.length-1].c}</h2> 
                        <div>${data.results[data?.results?.length-1].o - data?.results[data?.results?.length-1].c} Past </div> 
                    </>
                )}
            </div>

            <VictoryChart >
                <VictoryArea data={data.results} style={{ data: {fill: "#280137" }}} y="c" x="time"/>
                <VictoryAxis/>
            </VictoryChart>

            <div className="flex text-2xl mb-8 gap-10">
                <div type="radio" className={`cursor-pointer ${day == 2 ? 'font-bold text-[#280137] border-b-4 border-[#280137] pb-4 ' : 'text-black'} hover:font-bold hover:text-[#280137]`} onClick={() => handleChange(2)} value={2}>1D</div>
                <div type="radio" className={`cursor-pointer ${day == 8 ? 'font-bold text-[#280137] border-b-4 border-[#280137] pb-4 ' : 'text-black'} hover:font-bold hover:text-[#280137]`} onClick={() => handleChange(8)} value={8}>1W</div>
                <div type="radio" className={`cursor-pointer ${day == 31 ? 'font-bold text-[#280137] border-b-4 border-[#280137] pb-4 ' : 'text-black'} hover:font-bold hover:text-[#280137]`} onClick={() => handleChange(31)} value={31}>1M</div>
                <div type="radio" className={`cursor-pointer ${day == 91 ? 'font-bold text-[#280137] border-b-4 border-[#280137] pb-4 ' : 'text-black'} hover:font-bold hover:text-[#280137]`} onClick={() => handleChange(91)} value={91}>3M</div>
                <div type="radio" className={`cursor-pointer ${day == 366 ? `font-bold text-[#280137] border-b-4 border-[#280137] pb-4 ` : 'text-black'}`} onClick={() => handleChange(366)} value={366}>1Y</div>
            </div>

            <div>
                <h2 className="text-4xl border-b pb-8 font-bold">About</h2>
                <h3 className="pt-4 pb-4 text-xl">{meta.results?.description}</h3>
                <div className="flex justify-between mb-8">
                    <div className="text-xl">
                        <h2 className="font-bold mb-2 font-bold">Employees</h2>
                        <h3>{meta.results?.total_employees}</h3>
                    </div>
                    <div className="text-xl">
                        <h2 className="font-bold mb-2 font-bold">Headquarters</h2>
                        <h3>{meta.results?.address?.city}, {meta.results?.address?.state}</h3>
                    </div>
                    <div className="text-xl">
                        <h2 className="font-bold mb-2">List Date</h2>
                        <h3>{meta.results?.list_date}</h3>
                    </div>
                </div>

                {/* news - create separate components*/}
                <div>
                    <h2 className="border-b pb-8  mb-8 flex justify-between align-bottom"><span className="text-4xl font-bold">News</span><span className="">show more</span></h2>
                    <div>
                        {news.results?.map((report, idx) => (
                            <>
                                {idx < 3 && <>
                                <div className="flex justify-between hover:border pt-4 pb-4">
                                    <div className="pt-4 pb-4">
                                        <div className="text-xl">{report?.author}</div> 
                                        <div className="text-xl font-bold">{report?.title}</div>
                                        <div className="text-lg">{report?.description != undefined&&report?.description?.substring(0, 60) + '...'}</div>
                                    </div>
                                    <img className="object-cover h-[200px] w-[200px]" src={report.image_url} />
                                </div>
                                </>} 
                            </>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
};