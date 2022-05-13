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
            <label>Enter Student ID:</label>
            <input ref={idRef}></input>
            <button className="button">Submit</button>
        </form>
    )
}

export default UserSearch;