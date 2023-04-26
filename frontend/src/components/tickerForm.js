import React, { useState } from "react"

export default function TickerForm () {

    const [ticker, setTicker] = useState('');
    const [multiplier, setMultiplier] = useState('');
    const [timespan, setTimespan] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [limit, setLimit] = useState('');
    const [sort, setSort] = useState('');
    const [adjusted, setAdjusted] = useState('');

    const [data, setData] = useState({})
    
    const handleSubmit = async (e) => {
        e.preventDefault();

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

        const data = await fetch('http://localhost:5314/api/search', {
            method:"POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(payload)
        })

        if (data.ok) setData(await data.json())

    }

    console.log(data)

    return (
        <>
            <div className='border mt-4 text-3xl max-w-[1440px] m-auto'>
                <form className='flex flex-col border p-10' onSubmit={handleSubmit}>
                    <label for='ticker'> Stock ticker
                        <input className="p-2" name='ticker' onChange={e => setTicker(e.target.value)} type='text'/>
                    </label>
                    <label for='multiplier'> multiplier
                        <input name='multiplier' onChange={e => setMultiplier(e.target.value)} type='number'/>
                    </label>
                    <label for='timespan'> timespan
                        <select name='timespan' onChange={e => setTimespan(e.target.value)} >
                        <option value='' >--please select--</option>
                        <option value='minute' >minute</option>
                        <option value='hour' >hour</option>
                        <option value='day' >day</option>
                        <option value='week' >week</option>
                        <option value='month' >month</option>
                        <option value='quarter' >quarter</option>
                        <option value='year' >year</option>
                        </select>
                    </label>
                    <label for='start'> from start
                        <input className="p-2" name='start' type='date' onChange={e => setStart(e.target.value)} />
                    </label>
                    <label for='end'> to end
                        <input className="p-2" name='end' type='date' onChange={e => setEnd(e.target.value)} />
                    </label>
                    <label for='limit'> adjusted
                        <input className="p-2" name='limit' type='checkbox' value='true' onChange={e => setAdjusted(e.target.value)} />
                    </label>
                    <div onChange={e =>setSort(e.target.value)}>
                        <label> forwards
                            <input name="sort" type="radio" value="asc" />
                        </label>
                        <label> reverse
                            <input name="sort" type="radio" value="dsc" />
                        </label>
                    </div>
                    <label for='limit'> limit
                        <input className="p-2" name='limit' type='range' min={0} max={5000} onChange={e => setLimit(e.target.value)} />
                    </label>
                    <button>submit</button>
                </form>
            </div>

            {data.results&&<div>
                    {data?.results.map(ele=> (
                        <>
                            <div>
                                {ele.v}
                            </div>
                        </>
                    ))}
                </div>}
        </>
    )
}