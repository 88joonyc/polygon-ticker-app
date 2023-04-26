import logo from './logo.svg';

import TickerForm from './components/tickerForm';
import SearchBar from './components/searchBar';

function App() {
  return (
    <div className="App">
      <header className="text-4xl">
        <p>
          this will be the headerdf nav
        </p>
      </header>
      <SearchBar />
      <TickerForm />
    </div>
  );
}

export default App;
