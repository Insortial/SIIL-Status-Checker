import React from 'react'
import { Route, Routes, useNavigate } from 'react-router';
import axios from 'axios'
import SearchOutput from './SearchOutput';
import UserSearch from './UserSearch';

function SearchPage(props) {
    const [valid, setValid] = React.useState(true)
    const [badges, setBadges] = React.useState([]);
    const navigate = useNavigate();
    const [name, setName] = React.useState("")

    const updateID = (input) => {
        idSearch(input)
    }

    const idSearch = async (id) => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: `http://localhost:3000/cert/${id}`,
        headers: { 
            'Authorization': `Bearer ${props.token}`
        }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            setValid(true)
            setBadges(response.data.badges)
            setName(response.data.name)
            navigate('/search/active')
        })
        .catch(function (error) {
            console.log(error);
            setValid(false);
            navigate('/search')
        });
    }

    return (
        <>
            <UserSearch onChange={updateID} valid={valid}/>
            <Routes>
               <Route path="/active" element={<SearchOutput name={name} namebadges={badges}/>}/>   
            </Routes>
        </>
    )
}

export default SearchPage;
