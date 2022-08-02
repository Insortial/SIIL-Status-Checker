import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router, Link} from 'react-router-dom';
import './normalize.css';
import logo from './SIIL-Logo.png'
import UserLogin from './modules/UserLogin';
import SearchPage from './modules/SearchPage';
import UserRegister from './modules/UserRegister';

function App() {
  const [token, setToken] = React.useState("");

  function handleChange(value) {
    setToken(value);
  }

  return (
    <Router>
        <div className="App">
          <header>
            <div id="navigation">
              <Link to="/register" className="navLinks">Register</Link>
            </div>
            <div id="logoDiv">
              <img alt="Student Innovation Idea Labs Logo" src={logo} id="logo" />
              <h3>Student Innovation Idea Labs</h3>
            </div>
          </header>
          <div id="appBody">
            <Routes>
              <Route path="/" element={<UserLogin token={token} onChange={handleChange}/>}/>
              <Route path="/search/*" element={<SearchPage token={token} />}/>
              <Route path="/register" element={<UserRegister/>}/>
            </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
