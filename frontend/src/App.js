import logo from './logo.svg';
import { BrowserRouter, Route, Switch, Routes  } from 'react-router-dom'

import TickerForm from './components/tickerForm';
import SearchBar from './components/searchBar';

function App() {
  return (

    <BrowserRouter>
      <SearchBar />
      <Routes>
        <Route path='/' element={<> <TickerForm /></>} />
        <Route path='/ticker/:ticker' element={<TickerForm/> } />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
