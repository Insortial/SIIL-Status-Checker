import React, { useRef } from 'react';

function UserRegister() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const broncoIDRef = useRef()


    const postRegister = (e) => {
        e.preventDefault()
        var axios = require('axios');
        var data = JSON.stringify({
            "email": emailRef.current.value,
            "password": passwordRef.current.value,
            "firstName": firstNameRef.current.value,
            "lastName": lastNameRef.current.value,
            "broncoID": broncoIDRef.current.value
        });

        var config = {
        method: 'post',
        url: 'http://localhost:3000/auth/register',
        headers: { 
            'Content-Type': 'application/json'
        },
            data : data
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <form onSubmit={postRegister} id="userLoginBox" className="inputBox">
            <label id="signInTitle">Register Account:</label>
            <label>Email:</label>
            <input type="text" ref={emailRef}></input>
            <label>Password:</label>
            <input type="text" ref={passwordRef}></input>
            <label>First Name:</label>
            <input type="text" ref={firstNameRef}></input>
            <label>Last Name:</label>
            <input type="text" ref={lastNameRef}></input>
            <label>Bronco ID:</label>
            <input type="text" ref={broncoIDRef}></input>
            <button className="button">Submit</button>
        </form>
    )
}

export default UserRegister;