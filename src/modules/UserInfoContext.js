import React, { useContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const UserInfoContext = React.createContext();
const UserInfoUpdateContext = React.createContext();
const LogInUpdateContext = React.createContext();

export function UserInfo() {
    return useContext(UserInfoContext);
}

export function UserInfoUpdate() {
    return useContext(UserInfoUpdateContext);
}

export function LogInUpdate() {
    return useContext(LogInUpdateContext);
}

export function UserInfoProvider({ children }) {
    const [refreshToken, setRefreshToken] = useLocalStorage('token');
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn');
    const [accessToken, setAccessToken] = useState('token');

    function updateUser(data) {
        console.log(data)
        setAccessToken(data.accessToken)
    }

    function updateLoggedIn(data) {
        setLoggedIn(data)
    }

    return (
        <UserInfoContext.Provider value={{ refreshToken, accessToken, loggedIn }}>
            <UserInfoUpdateContext.Provider value={updateUser}>
                <LogInUpdateContext.Provider value={updateLoggedIn}>
                    {children}
                </LogInUpdateContext.Provider>
            </UserInfoUpdateContext.Provider>
        </UserInfoContext.Provider>
    )
}