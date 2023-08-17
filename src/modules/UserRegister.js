import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

function UserRegister() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const broncoIDRef = useRef()
    const [hasSubmit, setHasSubmit] = useState(false)


    const postRegister = (e) => {
        e.preventDefault()
        let data = JSON.stringify({
            "email": emailRef.current.value,
            "password": passwordRef.current.value,
            "firstName": firstNameRef.current.value,
            "lastName": lastNameRef.current.value,
            "broncoID": broncoIDRef.current.value
        });

        let config = {
        method: 'post',
        url: 'http://localhost:4000/register',
        headers: { 
            'Content-Type': 'application/json'
        },
            data : data
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            setHasSubmit(true)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return ( 
        <>
        {hasSubmit ? 
                (<div>
                    <h2>Successfully submited</h2>
                    <Link to="/">
                        <button className="button">Return to login</button>
                    </Link>
                </div>) : 
                (<form onSubmit={postRegister} id="userLoginBox" className="inputBox">
                    <h2 className="formTitle">Register Account</h2>
                    <label>Email:</label>
                    <input type="text" ref={emailRef}></input>
                    <label>Password:</label>
                    <input type="password" ref={passwordRef}></input>
                    <label>First Name:</label>
                    <input type="text" ref={firstNameRef}></input>
                    <label>Last Name:</label>
                    <input type="text" ref={lastNameRef}></input>
                    <label>Bronco ID:</label>
                    <input type="text" ref={broncoIDRef}></input>
                    <button className="button">Submit</button>
                </form>)
        }
        </>
    )
}

export default UserRegister;