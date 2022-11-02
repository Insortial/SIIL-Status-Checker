import React from 'react'
import axios from '../api/axios'
import { UserInfoUpdate } from '../modules/UserInfoContext'

const useRefreshToken = () => {
    const updateUser = UserInfoUpdate();

    const refresh = async () => {
        try {
            const response = await axios.post("/token", {
                withCredentials: true
            })
            console.log(response.data)
            updateUser(response.data)
            return response?.data.accessToken
        } catch(err) {
            console.error(err)
            return false
        }
    }
    return refresh
}
export default useRefreshToken