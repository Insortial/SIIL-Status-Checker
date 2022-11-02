import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router, Link, useLocation} from 'react-router-dom';
import './normalize.css';
import UserLogin from './modules/UserLogin';
import SearchPage from './modules/SearchPage';
import UserRegister from './modules/UserRegister';
import Menu from './modules/Menu';
import CardLog from './modules/CardLog';
import Navigation from './modules/Navigation';

function App() {

  return (
    <Router>
        <div className="App">
            <Navigation/>
            <div id="appBody">
              <Routes>
                <Route path="/login" element={<UserLogin/>}/>
                <Route path="/search/*" element={<SearchPage />}/>
                <Route path="/register" element={<UserRegister/>}/>
                <Route path="/menu" element={<Menu />}/>
                <Route path="/menu/iLab" element={<CardLog place="iLab"/>}/>
                <Route path="/menu/MS" element={<CardLog place="MS"/>}/>
                <Route path="/menu/IO" element={<CardLog place="IO"/>}/>
              </Routes>
            </div>
          </div>
    </Router>
  );
}

export default App;
