import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function UserRegister() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const broncoIDRef = useRef()
    const [hasSubmit, setHasSubmit] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [typeOfAccount, setTypeOfAccount] = useState("Student")
    const [idError, setIdError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    //Checks school API for user info
    useEffect(() => {
    
      return () => {
      }
    }, [idError])
    
    const detectChange = (e) => {
        setTypeOfAccount(e.target.value)
        console.log(e.target.value)
    }

    const formValidation = (e) => {
        e.preventDefault()
        if(broncoIDRef.current.value.trim().length === 0)
        {
            setIdError("Please enter a value")
        } else {
            setIdError(false)
        }

        if(typeOfAccount != "Student" )
        {
            if(passwordRef.current.value.trim().length === 0)
            {
                setPasswordError("Please enter a value")
            } else {
                setPasswordError(false)
            }
        }

        if(idError === false || passwordError === false)
        {
            postRegister()
        } else {
            return
        }

    }

    const postRegister = () => {
        let data = JSON.stringify({
            "broncoID": broncoIDRef.current.value,
            "password": typeOfAccount != "Student" ? passwordRef.current.value : "password",
            "role": typeOfAccount
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
            console.log(error.response.status);
            if(error.response.status === 500) {
                setIdError("Bronco ID not found")
            }
        });
    }

    return ( 
        <>
        {hasSubmit ? 
                (<div>
                    <h2>Successfully submited</h2>
                </div>) : 
                (<>
                    <form onSubmit={formValidation} id="userLoginBox" className="inputBox">
                        <h2 className="formTitle">Sign Up Form</h2>
                        <label>Type of Account: </label>
                        <select onChange={detectChange} id='registerSelect'>
                            <option value={"Student"}>Student</option>
                            <option value={"Ambassador"}>Ambassador</option>
                            <option value={"Staff"}>Staff</option>
                        </select>
                        {typeOfAccount == "Student" ? (<>
                            <label>Bronco ID:</label>
                            <input type="text" ref={broncoIDRef}></input>
                            <p className="errorMessage" style={{display: `${idError === false ? "none" : "block"}`}}>Error: {idError}</p>
                            <p className="errorMessage" style={{display: `${emailError === false ? "none" : "block"}`}}>Error: {emailError}</p>
                            <button className="button">Submit</button>
                        </>) : (<>
                            <label>Bronco ID:</label>
                            <input type="text" ref={broncoIDRef}></input>
                            <p className="errorMessage" style={{display: `${idError === false ? "none" : "block"}`}}>Error: {idError}</p>
                            <p className="errorMessage" style={{display: `${emailError === false ? "none" : "block"}`}}>Error: {emailError}</p>
                            <label>Password:</label>
                            <input type="password" ref={passwordRef}></input>
                            <p className="errorMessage" style={{display: `${passwordError === false ? "none" : "block"}`}}>Error: {passwordError}</p>
                            <button className="button">Submit</button>
                        </>) }
                    </form>
                </>)
        }
        </>
    )
}

export default UserRegister;