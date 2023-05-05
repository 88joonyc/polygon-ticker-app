import react from 'react';

import { VictoryChart, VictoryArea, VictoryAxis, VictoryLine, VictoryGroup, VictoryScatter } from 'victory';
import ControlPanel from '../components/controlPanel';
import Wallet from '../components/wallet';
import Ticker from './Ticker';


export default function Home () {
    return (
        <>
            <div className='max-w-[1440px] mx-auto'> 
                <div className='grid grid-cols-[3fr,1fr]'>
                     <div className='mx-10'> {/* // may change */}
                     <div>
                        <VictoryChart >
                            {/* <VictoryArea data={data.results} style={{ data: {fill: "#280137" }}} y="c" /> */}
                            <VictoryLine  style={{ data: {stroke: "#280137" }}} y="c" />
                            {/* <VictoryGroup data={data.results}  y="c" >
                                <VictoryLine  />
                                <VictoryScatter />
                            </VictoryGroup> */}
                        </VictoryChart>
                     </div>
                        <Wallet />
              
                    </div>
                    <ControlPanel />
                </div>
            </div>
        </>
    )
};