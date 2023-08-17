import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { LogInUpdate, UserInfoUpdate } from './UserInfoContext';
import { Link, useNavigate } from 'react-router-dom';

function UserLogin(props) {
    const navigate = useNavigate();
    let isMounted = false;
    let controller;
    const emailRef = useRef();
    const passwordRef = useRef();
    const updateUser = UserInfoUpdate();
    const updateLogIn = LogInUpdate();

    useEffect(() => {
        controller = new AbortController();
        isMounted = true
    
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])
    

    const postLogin = async (e) => {
        e.preventDefault();
        let data = {
            'username': emailRef.current.value,
            'password': passwordRef.current.value 
        }
        
        let config = {
            method: 'post',
            url: 'http://localhost:4000/login',
            withCredentials: true,
            headers: { 
                'Content-Type': 'application/json',
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            console.log(response.data);
            updateUser(response.data)
            updateLogIn(true)
            navigate('/');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <form onSubmit={postLogin} id="userLoginBox" className="inputBox">
            <h2 className="formTitle">Login</h2>
            <label>Email</label>
            <input type="email" ref={emailRef}></input>
            <label>Password</label>
            <input type="password" ref={passwordRef}></input>
            <button className="button">Submit</button>
        </form>
    )
}

export default UserLogin;