import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../SIIL-Logo.png'
import { LogInUpdate, UserInfo } from './UserInfoContext';

export default function Navigation() {
    const { loggedIn } = UserInfo();
    const updateLogIn = LogInUpdate(); 
    const [minMenu, setMinMenu] = useState(isMinMenu);
    const [menuExpanded, setMenuExpanded] = useState(false);
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        console.log(windowSize.innerWidth)
        setMinMenu(windowSize.innerWidth <= 650)
    }, [windowSize])

    useEffect(() => {
        console.log(loggedIn)
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, [])

    return (
        <header id="mainNav">
            <div id="navButton" style={{display: minMenu ? "flex" : "none"}} onClick={() => setMenuExpanded(!menuExpanded)}>...</div>
            <div id="navigation" style={{top: menuExpanded ? "60px" : "-1000px"}}>
                {!loggedIn || loggedIn === "none" ? ( //Checks if user has token, changes nav if they do or don't
                <>
                    <Link to="/login" className='navLinks'>Login</Link>
                    <Link to="/register" className='navLinks'>Register</Link>
                </>
                ) : (
                <>
                    <Link to="/" className='navLinks'>Menu</Link>
                    <Link to="/register" className='navLinks'>Register</Link>
                    <Link to="/login" onClick={() => updateLogIn(false)} className='navLinks' style={{color: 'black'}}>Logout</Link>
                </>
                )
                }
            </div>
            <div id="logoDiv">
                <img alt="Student Innovation Idea Labs Logo" src={logo} id="logo" />
                <h3>Student Innovation Idea Labs</h3>
            </div>
        </header>
    )
}

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

function isMinMenu() {
    const { innerWidth } = window;
    return innerWidth <= 650
}