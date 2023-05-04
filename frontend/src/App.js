import logo from './logo.svg';
import { BrowserRouter, Route, Switch, Routes  } from 'react-router-dom'

import TickerForm from './components/tickerForm';
import NavBar from './components/navBar';
import Ticker from './pages/Ticker';

function App() {
  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<> <TickerForm /></>} />
        <Route path='/ticker/:ticker' element={<Ticker /> } />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
