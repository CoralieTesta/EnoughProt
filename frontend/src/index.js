import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { DailySummary } from './pages/DailySummary/DailySummary';
import { Login } from './pages/Login/Login';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { SpecificDay } from './pages/SpecificDay/SpecificDay';
import { Food } from './pages/Food/Food';
import { ProteinQuantity } from './pages/ProteinQuantity/ProteinQuantity';
import { AddFood } from './pages/AddFood/AddFood'
import { UserContextProvider } from './store/user-context';
import { DayContextProvider }from './store/day-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <DayContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            
            <Route path='/' element={<ProteinQuantity/>}/>
            <Route path='/dailySummary' element={<DailySummary/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/food' element={<Food/>}/>
            <Route path='/addFood' element={<AddFood/>}/>
            <Route path='/day/:day_date/:month_date/:year_date' element={<SpecificDay/>}/>
          </Route>
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
      </DayContextProvider>
  </UserContextProvider>
);
