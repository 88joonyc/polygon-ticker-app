import image from '../'


export const ImageBanner = function ({data}) {

    // const data = {
    //     "meta":{
    //         "image": require("../data/307918.jpg"),
    //         "title": "Invest in something and dont be afraid of the dark",
    //         "subtitle":"invest in stocks, options, ETFs at your pace and commission 100%",
    //         "aux":"Investing insurance",
    //         "button":"Learn More",
    //     },
    //     "options":{
    //         "color":"#fcfcfc",
    //         "position":"normal"
    //     }
    // }

    const info = data.meta;
    const outline = data.options


    return (
        <>
            <div className={`bg-${outline?.color} w-full text-${outline?.text}`}>
                <div className="grid md:grid-cols-[1fr,1fr]">
                    <div className='hidden md:block'>
                        <img className='h-full object-cover' src={`${info.image}`}/>
                    </div>
                    <div className="flex flex-col h-[45rem] md:w-[360px] ml-4 md:ml-8">
                        <div className="my-auto">
                            <h2 className="text-3xl md:text-6xl font-light mb-10">{info.title}</h2>
                            <div className="text-xl pb-8">{info.subtitle}</div>
                            <div className="text-lg font-light pb-10">{info.aux}</div>
                            <button className="px-8 py-4 border rounded-full">{info.button}</button>
                        </div>
                    </div>
                </div>
                <div className="h-20 flex items-center justify-center text-sm">
                    <div className='mx-4'>
                        Stocks & funds offered through Robinhood Financial. Other fees may apply. See our Fee Schedule for more details.
                    </div>
                </div>

            </div>
        </>
    )
}