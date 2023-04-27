import React, { useState } from "react"
// import { scaleBand, scaleLinear } from "@visx/scale";
// import { Group } from '@visx/group';
// import { Bar } from '@visx/shape';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';


export default function TickerCharts ({data, meta, logoimage}) {

    // const width = 500;
    // const height = 500;
    // const margin = { top: 20, bottom: 20, left: 20, right: 20 };

    // const xMax = width - margin.left - margin.right;
    // const yMax = height - margin.top - margin.bottom;

    // const x = d => d.letter;
    // const y = d => +d.frequency * 100;

    // const xScale = scaleBand({
    //     range: [0, xMax],
    //     round: true,
    //     domain: data.map(x),
    //     padding: 0.4
    // })

    // const yScale = scaleLinear({
    //     range: [yMax, 0],
    //     round: true,
    //     domain: [0, Math.max(...data.map(y))]
    // })

    // const compose = (scale, accessor) => data => scale(accessor(data));

    // const xPoint = compose(xScale, x);
    // const yPoint = compose(yScale, y);

    const metaData = meta.results;

    console.log(logoimage)

    return (
        // <svg width={width} height={height}>
        //     {data.map((d, i) => {
        //         const barHeight = yMax - yPoint(d.v);
        //         console.log(yPoint(d.v))
        //         return (
        //         <Group key={`bar-${i}`}>
        //             <Bar
        //                 x={xPoint(d.v)}
        //                 y={yMax - barHeight}
        //                 height={barHeight}
        //                 width={xScale.bandwidth()}
        //                 fill="#fc2e1c"
        //             />
        //         </Group>
        //         );
        //     })}
        // </svg>
        <div className="mx-auto max-w-[1440px] mt-10">
            <h1 className="text-4xl">{metaData.name}</h1>
            <LineChart className=" mt-5" width={1400} height={600} data={data}>
                <Line type="monotone" dataKey="v" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
            <div className="border p-10">
                <h2 className="text-2xl">logo</h2>
                {/* <img src={`data:image/svg+xml;base64,${btoa(logoimage)}`} width={300} height={300} alt="brand logo"/> */}
                <h2 className="text-2xl">description</h2>
                <p className="text-1xl">{metaData.description}</p>
                <h2 className="text-2xl">Total employees</h2>
                <p className="text-1xl">{metaData.total_employees}</p>
                <h2 className="text-2xl">Ticker</h2>
                <p className="text-1xl">{metaData.ticker}</p>
                <h2 className="text-2xl">market cap</h2>
                <p className="text-1xl">{metaData.market_cap}</p>
                <h2 className="text-2xl">share class shares outstanding</h2>
                <p className="text-1xl">{metaData.share_class_shares_outstanding}</p>
                <h2 className="text-2xl">weighted shares outstanding</h2>
                <p className="text-1xl">{metaData.weighted_shares_outstanding}</p>
                <h2 className="text-2xl">market type</h2>
                <p className="text-1xl">{metaData.market}</p>
                <h2 className="text-2xl">primary exchange</h2>
                <p className="text-1xl">{metaData.primary_exchange}</p>
                <h2 className="text-2xl">locale / region</h2>
                <p className="text-1xl">{metaData.locale}</p>
                <h2 className="text-2xl">date listed</h2>
                <p className="text-1xl">{metaData.list_date}</p>
                <h2 className="text-2xl">locale / region</h2>
                <p className="text-1xl">{metaData.locale}</p>
                <h2 className="text-2xl">locale / region</h2>
                <p className="text-1xl">{metaData.locale}</p>
            </div>
        </div>
    )
}