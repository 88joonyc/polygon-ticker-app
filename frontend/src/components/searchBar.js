import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

export default function SearchBar() {
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
        <div className="bg-slate-400 mx-auto relative">
            <div className="max-w-[1440px] mx-auto p-4 relative flex justify-center">
                <input className="p-2 text-2xl border w-[800px]" onChange={e => setKeyword(e.target.value)}/>
            </div>

            <div className="relative flex justify-center">
                {searchQuery&&<div className="absolute">
                    <div className="top-20 w-[800px] bg-slate-100 opacity-85">
                        {bestMatches.map(matches => (
                            <Link to={`/ticker/${matches['1. symbol']}`} onClick={() => setKeyword('')}>
                                <div className="border p-3 text-md flex justify-between hover:bg-slate-300">
                                    <div>{matches['1. symbol']}</div>
                                    <div>{matches['2. name']}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    )
}