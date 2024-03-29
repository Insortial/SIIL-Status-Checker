import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

function UserSearch(props) {
    const idRef = useRef();

    function handleChange(e) {
        // Here, we invoke the callback with the new value
        e.preventDefault();
        console.log("Working")
        props.onChange(idRef.current.value);
    }

    return (
        <form onSubmit={handleChange} id="userSearchBox" className="inputBox">
            <label>Enter Bronco ID:</label>
            <input type="search" ref={idRef} autoFocus></input>
            <p className="errorMessage" style={{display: `${!props.valid ? "block" : "none"}`}}>Error: ID is invalid</p>
            <button className="button">Submit</button>
        </form>
    )
}

export default UserSearch;