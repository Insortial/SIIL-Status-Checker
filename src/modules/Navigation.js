import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import logo from '../SIIL-Logo.png'
import { UserInfo } from './UserInfoContext';

export default function Navigation() {

    const { loggedIn } = UserInfo()

    return (
        <header>
            <div id="navigation">
                {!loggedIn || loggedIn === "none" ? ( //Checks if user has token, changes nav if they do or don't
                <>
                    <Link to="/" className='navLinks'>Login</Link>
                    <Link to="/register" className='navLinks'>Register</Link>
                </>
                ) : (
                <>
                    <Link to="/search" className='navLinks'>Search</Link>
                    <Link to="/menu" className='navLinks'>Menu</Link>
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
