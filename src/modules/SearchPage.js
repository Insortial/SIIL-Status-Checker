import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router';
import axios from 'axios'
import SearchOutput from './SearchOutput';
import UserSearch from './UserSearch';

function SearchPage(props) {
    const axios = require('axios');
    const [found, setFound] = React.useState(false)
    const [id, setID] = React.useState("");
    const [badges, setBadges] = React.useState([]);
    const navigate = useNavigate();
    const [name, setName] = React.useState("")

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'https://api.badgr.io/v2/badgeclasses',
            headers: { 
              Authorization: `Bearer ${props.token}`
            }
        };

        axios(config)
        .then(function (response) {
            updateBadgeState(response.data.result)
        })
        .catch(function (error) {
            console.log(error);
        });
          
    }, [props.token])

    useEffect(() => {
        if(id !== "")
        {
            idSearch()  
        }
        
    }, [id])

    useEffect(() => {
        console.log(found)
        if(name !== "")
        {
            navigate('/search/active')
        }
    }, [name])

    const updateBadgeState = (badges) => {
        let newBadgeState = []
        badges.map((badge) => {
            newBadgeState.push({
                name: badge.name, 
                entityId: badge.entityId, 
                finished: false
            })
        })
        console.log(newBadgeState)
        setBadges(newBadgeState)
    }

    const updateID = (input) => {
        setID(input)
    }

    const idSearch = async () => {
        let newBadges = badges
        let promises = []
        let name = ""
        newBadges.forEach((badge) => {
            var config = {
                method: 'get',
                url: `https://api.badgr.io/v2/badgeclasses/${badge.entityId}/assertions`,
                headers: { 
                  'Authorization': `Bearer ${props.token}`
                }
            };
    
            promises.push(axios(config))
        })

        Promise.all(promises).then(function(response) {
            response.forEach((instance) => {
                console.log(instance.data.result)
                instance.data.result.forEach((badge) => {
                    if(badge.recipient.plaintextIdentity === id) {
                        console.log(badge.recipient.plaintextIdentity)
                        newBadges.forEach((badgeClass) => {
                            if(badgeClass.entityId === badge.badgeclass)
                            {
                                badgeClass.finished = true
                            }
                        })
                    } 
                })
                /* console.log(id)
                console.log(instance.recipient.plaintextIdentity) */
                /* if(instance.recipient.plaintextIdentity === id)
                {
                    console.log(instance)
                } */
            })
            console.log(newBadges)
            setBadges(newBadges)
            setName(id)
        })
    }

    return (
        <>
            <UserSearch onChange={updateID}/>
            <Routes>
               <Route path="/active" element={<SearchOutput name={name} namebadges={badges}/>}/>   
            </Routes>
        </>
    )
}

export default SearchPage;
