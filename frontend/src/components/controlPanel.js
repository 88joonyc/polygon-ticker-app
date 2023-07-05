import react, { useState, useEffect } from 'react';
import { purchase, sellandgetridofstock } from '../store/stock';
import { useDispatch, useSelector } from 'react-redux';
import { directUpdate } from '../store/wallet';
import { Navigate, useNavigate } from 'react-router-dom';
import { Redirect } from 'react-router';

export default function ControlPanel ({ticker, data}) {
    const dispatch = useDispatch();

    const userId = useSelector(state => state.session.user?.id)
    const wallet = useSelector(state => state?.wallet)
    const shares = useSelector(state => state?.stock?.stock)
    const share = shares.filter(share => share.ticker == ticker)
    const naviagte = useNavigate();

    const [control, setControl] = useState('buy')
    const [type, setType] = useState('shares')
    const [qty, setQty] = useState('')
    const [account, setAccount] = useState('dollars')

    const [ showMenu, setShowMenu ] = useState(false);
    const toggleMenu = (e) => {
        e.stopPropagation()
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
          setShowMenu(false);
        };
    
        document.addEventListener('click', closeMenu);
      
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const currentSharePrice = data?.results?.[data?.results?.length-1]?.c ? data?.results[data?.results?.length-1]?.c : 0;


    const submitPurchase = async function (e) {
        e.preventDefault()

        if (window.confirm(`Are you sure you want to spend ${currentSharePrice * qty}?`)) {
            const isuserbroke = dispatch(directUpdate({
                userId,
                accountType: account,
                amount: currentSharePrice * qty 
                })
            )

            console.log('checking', isuserbroke)
        
            if (!isuserbroke.wallet.message){
                const response = dispatch(purchase({
                    ticker,
                    originalPrice: data.results[data?.results?.length-1].c,
                    qty,
                    userId,
                }))
        
                if (response.response.response) {
                    alert("Purchase complete!")
                    naviagte("/")
                } 
                // return (<Redirect to="/" />)
                // return (<Navigate to="/"/>)
            } else {
                alert(isuserbroke.wallet.message)
            }
        }
    }

    const getPower = function() {
        if (wallet.wallet) {
            let type = wallet.wallet.filter(power => power.accountType == account)
            return type[0]?.buyingPower
        }
    }




    const sellStock = async function(e) {
        e.preventDefault();
        if (window.confirm(`Are you sure you want to sell ${qty} stocks at ${currentSharePrice} each?`)) {
            // here
            dispatch(sellandgetridofstock(share.id))
        }
        
    }
    
    const sellAll = async function(e) {
        e.preventDefault();
        const subtot = share[0]?.qty*currentSharePrice
        const id = share[0]?.id
        if (id&&window.confirm(`Are you sure you want to sell all ${share[0].qty} stocks at ${currentSharePrice} each? This totals to ${subtot}`)) {
            // here
            const sold = dispatch(sellandgetridofstock())

            if (sold) {
                dispatch(directUpdate(userId, account, subtot))
            }
        }
    }

    return (
        <>
            <div className='md:max-w-[400px] relative'>
                <div className='flex flex-col border border-gray-200 pt-6  sticky top-[120px] shadow-lg'>
                    <div className='flex w-full px-6 gap-6 border-b '>
                        <button onClick={() => setControl('buy')} className={`text-xl font-bold capitalize hover:text-highlightPurple pb-3 ${control == 'buy' ? 'text-highlightPurple border-b-4 border-highlightPurple' : 'text-midnightPurple' }`}>Buy{' ' + ticker}</button>
                        <button onClick={() => setControl('sell')} className={`text-xl font-bold capitalize hover:text-highlightPurple pb-3 ${control != 'buy' ? 'text-highlightPurple border-b-4 border-highlightPurple' : 'text-midnightPurple' }`}>Sell{ ' ' + ticker} </button>
                    </div>
                    <form onSubmit={control == 'buy' ? submitPurchase : sellStock } className='flex flex-col px-6 my-6'>
                        <div className='pb-4 flex justify-between'>
                            <span>Order Type</span> <div className='capitalize'><div>{control} Order</div><div className='float-right text-gray-500'>{control == 'buy' ? 'Limit' : 'Market'}</div></div>
                        </div>
                        <label className='text-base flex justify-between'><span className='capitalize'>{control} in</span>
                            <select className='border bg-white p-2 w-[150px] ' onChange={e => setType(e.target.value)}>
                                <option value='shares'>Shares</option>
                                {/* <option value='dollars'>Dollars</option> */}
                            </select>
                        </label>
                        <div></div>
                        <label className='text-base py-2 flex justify-between items-center'> <span className='capitalize'>{type}</span>
                            <input className='py-2 px-4  border w-[150px] text-right' placeholder='0' type="number" min={0} onChange={e => setQty(e.target.value)} />
                        </label>
                        <div className='flex pt-4 justify-between font-bold'>
                            <div className='text-highlightPurple'>
                                Market Price
                            </div>
                            <div>
                                ${currentSharePrice}
                            </div>
                        </div>
                        <div className='flex pt-4 justify-between font-bold border-t mt-4'>
                            <div>
                                Estimated {control == 'buy' ? 'Cost' : 'Credit'}
                            </div>
                            <div>
                                ${qty > 0 ? (qty*currentSharePrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
                            </div>
                        </div>
                        <button disabled={qty > 0 ? false : true} className='p-4 border capitalize rounded-full mt-10 text-sm text-white font-medium bg-midnightPurple hover:bg-highlightPurple'>review order</button>
                    </form>
                    <div className='text-sm w-full flex justify-center p-4 border-t'>
                        ${control == 'buy' ? `${!getPower() ? 0 : getPower().toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} buying power available` : `${share[0]?.qty ? share[0]?.qty : 0} Shares Available`} 
                        &nbsp;-&nbsp; <button onClick={sellAll} className='text-highlightPurple font-bold'>Sell All</button>
                    </div>
                    <button className='hover:bg-fadedPurple w-full flex justify-center py-4 border-t' onClick={toggleMenu}>
                        <label className='text-sm flex justify-between cursor-pointer'> {account == 'dollars' ? 'Brokerage' : 'Bitcoin' }
                        </label>
                    </button>
                    {showMenu&&<div>
                    <select className='border bg-white p-2 w-full ' onChange={e => setAccount(e.target.value)} required>

                                <option value={``}>select</option>
                                    {wallet.wallet.map(money => (
                                        <option 
                                            key={`wallet-with-${money.id}`} 
                                            value={`${money.accountType}`}>{money.accountType}
                                        </option>
                                    ))}
                                    {/* <option value='dollars'>Dollars</option> */}
                                </select>
                    </div>}
                </div>
            </div>
        </>
    )
}