import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

export default function NavBar() {
    const [ keyword, setKeyword ] = useState();
    const [ searchQuery ] = useDebounce(keyword, 500);
    const [ bestMatches, setBestMatches ] = useState([])

    useEffect(() => {
        const delayDebounceSearch = setTimeout(async () => {
            if (searchQuery) {
                try {
                    const response = await fetch(`http://localhost:5314/api/search/by/${searchQuery}`)
                    let data 
                    if (response.ok) {
                        data = await response.json()
                        console.log('this ranm')
                        setBestMatches([...data.bestMatches])
                    }
                } catch (err) {
                    console.log(err)
                }
            }

            return () => clearTimeout(delayDebounceSearch)
        }, 500)
    }, [searchQuery])

    console.log(bestMatches)

    return (
        <div className="mx-auto sticky top-0 right-0 z-40 bg-white">
            <div className="max-w-[1440px] flex mx-auto items-center">
                <div className="">
                    Logo
                </div>

                <div className="mx-auto p-4 relative flex justify-center">
                    <input className="p-2 pl-8s text-2xl border w-[600px] rounded-md border-grey-100" placeholder="search" onChange={e => setKeyword(e.target.value)}/>
                </div>

                <div className="relative flex justify-center">
                    {searchQuery&&<div className="absolute ">
                        <div className="top-20 w-[600px] opacity-85 bg-white">
                            {bestMatches.map((matches, idx) => (
                                <Link to={`/ticker/${matches['1. symbol']}`} key={`${matches['1. symbol']} -- ${idx}`} onClick={() => setKeyword('')}>
                                    <div className="border p-3 text-md flex justify-between hover:text-white hover:bg-midnightPurple">
                                        <div >{matches['1. symbol']}</div>
                                        <div >{matches['2. name']}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>}
                </div>

                <div className="flex gap-8 text-lg font-bold">
                    <div className="hover:text-midnightPurple hover:cursor-pointer">Log In</div>
                    <div className="hover:text-midnightPurple hover:cursor-pointer">Sign Up</div>
                </div>
            </div>
        </div>
    )
}