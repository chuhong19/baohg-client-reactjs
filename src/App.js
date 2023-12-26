import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './views/About';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard';
import Market from './views/Market';
import Profile from './views/Profile';
import ProtectedRoute from './components/routing/ProtectedRoute';
import MyProductContextProvider from './contexts/MyProductContext';
import AllProductContextProvider from './contexts/AllProductContext';
import Transaction from './views/Transaction';
import MyBuyTransaction from './views/MyBuyTransaction';
import MyTransactionContextProvider from './contexts/MyTransactionContext';
import MySellTransactionContextProvider from './contexts/MySellTransactionContext';
import MySellTransaction from './views/MySellTransaction';

function App() {
  return (
    <AuthContextProvider>
      <MyTransactionContextProvider>
        <MySellTransactionContextProvider>
          <AllProductContextProvider>
            <MyProductContextProvider>
              <Router>
                <Routes>
                  <Route path='/' element={<Landing />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/login' element={<Auth authRoute='login' />} />
                  <Route path='/register' element={<Auth authRoute='register' />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path='/dashboard' Component={Dashboard} />
                    <Route path='/market' Component={Market} />
                    <Route path='/profile' Component={Profile} />
                    <Route path='/createTransaction/:transactionId' Component={Transaction} />
                    <Route path='/myBuyTransaction' Component={MyBuyTransaction} />
                    <Route path='/mySellTransaction' Component={MySellTransaction} />
                  </Route>
                </Routes>
              </Router>
            </MyProductContextProvider>
          </AllProductContextProvider>
        </MySellTransactionContextProvider>
      </MyTransactionContextProvider>
    </AuthContextProvider>
  );
}

export default App;
