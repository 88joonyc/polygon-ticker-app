import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import InfoPanel from "../components/infoPanel";
import ControlPanel from "../components/controlPanel";
import { csrfFetch } from "../store/csrf";

export default function Ticker () {

    const { ticker } = useParams();

    const [data, setData] = useState({});
    const [meta, setMeta] = useState({});
    const [image, setImage] = useState('');
    const [news, setNews] = useState('');

    // console.log('herresults', data, news)

    const headerOptions = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${process.env.REACT_APP_POLYGONAPISECRETEKEY}`
        }
    }

    // useEffect(() => {
        // async function runme() {
        //     let data
        //     try {
        //         data = await fetch('api/ticker/search', {
        //             method: 'POST',
        //             headers: {"Content-Type": 'application/json'},
        //             body: JSON.stringify(payload)
        //         })
        //     } catch (err) {
        //         console.log(err)
        //     }
        //     const response = await data.json();
        //     if (response.status == 'OK') {
        //         console.log('setup error handling;', response)
        //         setDataPoints(response.results)
        //     }
        // }

        async function findmeta(payload) {
            console.log('thisishuitting')
            await Promise.all([
                csrfFetch('/api/ticker/search', {
                    method:"POST",
                    headers: {"Content-Type": 'application/json'},
                    body: JSON.stringify(payload)
                }).then(async res => setData(await res.json()))
                  .catch(err => console.log(err)),
                csrfFetch(`/api/ticker/details/${ticker}`)
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
                csrfFetch(`/api/ticker/news/${ticker}`)
                .then(async res => await res.json())
                .then(data => setNews(data))
                .catch(err => console.log(err))
            ]);
        } 

        // console.log(start)
        // runme()
        // findmeta(payload)

    // }, [ticker, start])

    return (
        <>
            <div className="max-w-[1140px] mx-auto">
                <div className="relative">
                     <div className="grid md:grid-cols-[2.5fr,1.2fr] gap-x-20 md:px-4">
                        <div>
                            <InfoPanel ticker={ticker} data={data} meta={meta} image={image} news={news} findmeta={findmeta} />
                        </div>
                        <ControlPanel ticker={ticker} data={data}/> 
                     </div>
    


                </div>
            </div>
            {/* <LineChart className=" m-5" width={1000} height={800} data={dataPoints}>
                <Line type="monotone" dataKey="c" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart> */}


        </>
    )
};