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
import Layout from './modules/Layout';
import Auth from './modules/Auth';

function App() {

  return (
    <Router>
        <div className="App">
            <Navigation/>
              <Routes>
                <Route path="/" element={<Layout/>}>
                  <Route path="/login" element={<UserLogin/>}/>
                  <Route path="/register" element={<UserRegister/>}/>

                  <Route element={<Auth />}>
                    <Route path="/" element={<Menu />}/>
                  </Route>

                  <Route element={<Auth />}>
                    <Route path="/menu/iLab/*" element={<CardLog place="iLab"/>}/>
                  </Route>

                  <Route element={<Auth />}>
                    <Route path="/menu/MS/*" element={<CardLog place="MS"/>}/>
                  </Route>
                  
                  <Route element={<Auth />}>
                    <Route path="/menu/IO/*" element={<CardLog place="IO"/>}/>
                  </Route>
                </Route>
              </Routes>
          </div>
    </Router>
  );
}

export default App;
