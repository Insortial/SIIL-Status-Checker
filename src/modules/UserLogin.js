import React, { useRef, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';

function UserLogin(props) {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const postLogin = async (e) => {
        e.preventDefault();
        var data = {
            'username': emailRef.current.value,
            'password': passwordRef.current.value 
        }
        var config = {
            method: 'post',
            url: 'http://localhost:3000/auth/login',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            console.log(response.data.accessToken);
            props.onChange(response.data.accessToken)
            navigate('/search')
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <form onSubmit={postLogin} id="userLoginBox" className="inputBox">
            <label id="signInTitle">Log In:</label>
            <label>Email:</label>
            <input type="email" ref={emailRef}></input>
            <label>Password:</label>
            <input type="password" ref={passwordRef}></input>
            <button className="button">Submit</button>
            <Link to="/register">
                <button id="registerRedirect">Register Users</button>
            </Link>
            
        </form>
    )
}

export default UserLogin;