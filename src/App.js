import axios from 'axios';
import React from 'react';
import './App.css';
import { Route, Routes, Redirect, BrowserRouter as Router } from 'react-router-dom';
import './normalize.css';
import logo from './SIIL-Logo.png'
import UserLogin from './modules/UserLogin';
import SearchPage from './modules/SearchPage';

function App() {
  const [token, setToken] = React.useState("");

  function handleChange(value) {
    setToken(value);
  }

  return (
    <Router>
        <div className="App">
          <header>
            <img src={logo} id="logo" />
            <h3>Student Innovation Idea Labs</h3>
          </header>
          <div id="appBody">
            <Routes>
              <Route path="/" element={<UserLogin token={token} onChange={handleChange}/>}/>
              <Route path="/search/*" element={<SearchPage token={token} />}/>
            </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
