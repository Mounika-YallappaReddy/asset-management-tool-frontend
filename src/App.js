import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Email from './components/Email';
import Forgotpass from './components/Forgotpass'
import DashboardNew from './components/DashboardNew';

export const CommonContext = React.createContext();
const apiurl = 'https://asset-management-tool-back.onrender.com'

function App() {
  return <>
    <BrowserRouter>
      <CommonContext.Provider value={{ apiurl }}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard-new' element={<DashboardNew />} />
          <Route path='/register' element={<Register />} />
          <Route path='/email' element={<Email />} />
          <Route path='/forgot-pass' element={<Forgotpass />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </CommonContext.Provider>
    </BrowserRouter>
  </>
}

export default App;
