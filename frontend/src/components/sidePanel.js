import react, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { csrfFetch } from '../store/csrf';

export default function SidePanel () {

    const stocks = useSelector(state => state.stock.stock)

    useEffect(() => {
        async function run() {
            const response = await csrfFetch('http://localhost:5314/api/ticker/search/multiple', {
                method: 'POST',
                'Content-type': 'application/JSON',
                body: JSON.stringify({
                    symbols: [
                        stocks.map(stock => stock.ticker)
                    ]
                })
            })

            const data = await response.json()

            console.log('mrmesadas-----------------------',data)

        }

        // async function plot() {
        //     const response = await csrfFetch('/api/ticker/search/multiple', {
        //         method: 'POST',
        //         'Content-type': 'application/JSON',
        //     }) 
        // }
        // run()
    }, [stocks])
    

    return (
        <>
            <div className='border' >
                <div className='w-full border-b p-4 h-[50px]'>
                    <div className='w-full '>Stocks</div>
                </div>
                <div>
                    {stocks&&stocks.map(stock => (
                        <>
                            <div className='p-6 flex justify-between'>
                                <span>{stock.ticker}</span>
                                <span>{stock.qty}</span>
                                <span>{stock.originalPrice}</span>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}