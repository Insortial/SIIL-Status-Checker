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
        var data = qs.stringify({
            'username': emailRef.current.value,
            'password': passwordRef.current.value 
        })
        var config = {
            method: 'post',
            url: 'https://api.badgr.io/o/token',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            //console.log(JSON.stringify(response.data.access_token));
            props.onChange(response.data.access_token)
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
            <input type="text" ref={emailRef}></input>
            <label>Password:</label>
            <input type="password" ref={passwordRef}></input>
            <button className="button">Submit</button>
        </form>
    )
}

export default UserLogin;