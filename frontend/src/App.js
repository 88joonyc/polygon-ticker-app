import logo from './logo.svg';
import { BrowserRouter, Route, Switch, Routes  } from 'react-router-dom'

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainRoutes from './components/mainRoutes';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <MainRoutes /> } />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
