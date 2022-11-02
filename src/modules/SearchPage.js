import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router';
import SearchOutput from './SearchOutput';
import { UserInfo } from './UserInfoContext';
import UserSearch from './UserSearch';
import useAxiosPrivate from '../hooks/useAxiosPrivate'

function SearchPage(props) {
    const [valid, setValid] = React.useState(true)
    const [badges, setBadges] = React.useState([]);
    const navigate = useNavigate();
    const [name, setName] = React.useState("")
    const { accessToken } = UserInfo()
    const axiosPrivate = useAxiosPrivate();
    let controller;

    const updateID = (input) => {
        idSearch(input)
    }

    const idSearch = async (id) => {
        controller = new AbortController();
        try {
            const response = await axiosPrivate.get(`/cert/${id}`, {
                signal: controller.signal
            })
            if(!response) {
                navigate('/login')
                return
            }
            console.log(JSON.stringify(response.data));
            setValid(true)
            setBadges(response.data.badges)
            setName(response.data.name)
            navigate('/search/active')
            controller.abort()
        } catch(err) {
            console.error(err)
            setValid(false);
            navigate('/search')
        }
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
