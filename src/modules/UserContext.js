import React, { useContext, useState, useEffect } from 'react';

const UserInfoContext = React.createContext();

export function UserContext() {
    return useContext(UserInfoContext) 
}

const [loggedIn, setLoggedIn] = useState(false);

return (
    <UserInfoContext.Provider value={{}}
)
