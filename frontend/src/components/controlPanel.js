import react, { useState } from 'react';
import { purchase } from '../store/stock';
import { useDispatch, useSelector } from 'react-redux';

export default function ControlPanel ({ticker}) {
    const dispatch = useDispatch();

    const userId = useSelector(state => state.session.user?.id)
    const wallet = useSelector(state => state.session.wallet)

    const [control, setControl] = useState('buy')
    const [type, setType] = useState('shares')
    const [qty, setQty] = useState('')

    const submitPurchase = async function (e) {
        e.preventDefault()
        await dispatch(purchase({
            userId,
            ticker,
            // amount,


        }))
    }



    return (
        <>
            <div className='max-w-[400px] relative '>
                <div className='flex flex-col border border-gray-200  p-8 sticky top-[120px] shadow-lg'>
                    <div className='text-xl mb-8 font-bold capitalize text-midnightPurple '>{control + ' ' + ticker}</div>
                    <form onSubmit={submitPurchase} className='flex flex-col'>
                        <label className='text-[20px] flex justify-between'> Buy in
                            <select className='border bg-white p-2 w-[120px] ' onChange={e => setType(e.target.value)}>
                                <option value='shares'>Shares</option>
                                <option value='dollars'>Dollars</option>
                            </select>
                        </label>
                        <label className='text-[20px] py-8 flex justify-between items-center'> <span className='capitalize'>{type}</span>
                            <input className='py-2 px-4  border w-[120px]' type="number" onChange={e => setQty(e.target.value)} />
                        </label>
                        <button className='p-4 border rounded-full  my-8 text-xl text-white font-bold bg-midnightPurple hover:bg-purple-950'>review order</button>
                    </form>
                </div>
            </div>
        </>
    )
}