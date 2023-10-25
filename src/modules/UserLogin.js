import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { LogInUpdate, UserInfoUpdate } from './UserInfoContext';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Input, IconButton, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function UserLogin(props) {
    const navigate = useNavigate();
    let isMounted = false;
    let controller;
    const emailRef = useRef();
    const passwordRef = useRef();
    const updateUser = UserInfoUpdate();
    const updateLogIn = LogInUpdate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        controller = new AbortController();
        isMounted = true;

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const postLogin = async (e) => {
        e.preventDefault();
        let data = {
            'username': emailRef.current.value,
            'password': passwordRef.current.value
        };

        let config = {
            method: 'post',
            url: 'http://localhost:4000/login',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                updateUser(response.data);
                updateLogIn(true);
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
            <TextField
                inputRef={emailRef}
                variant="outlined"
                fullWidth
            />
            {/* toggling password visibility + the input box */}
            <label>Password</label>
            <TextField
                type={showPassword ? 'text' : 'password'}
                inputRef={passwordRef}
                variant="outlined"
                fullWidth
                InputProps={{
                    endAdornment: (
                        <IconButton
                            size="small"
                            onClick={togglePasswordVisibility}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            {showPassword ? (
                                <Visibility fontSize="small" />
                            ) : (
                                <VisibilityOff fontSize="small" />
                            )}
                        </IconButton>
                    ),
                }}
            />

        <button className="button">Submit</button>

        </form>
    );
}

export default UserLogin;
