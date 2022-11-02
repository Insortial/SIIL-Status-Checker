import axios, { axiosPrivate } from '../api/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import { LogInUpdate, UserInfoUpdate } from '../modules/UserInfoContext'
import { UserInfo } from '../modules/UserInfoContext'

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const updateLogIn = LogInUpdate();
    const { accessToken } = UserInfo();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']) {
                    console.log("HEELOO")
                    config.headers['Authorization'] = `Bearer ${accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    if(!newAccessToken) 
                    {
                        updateLogIn(false)
                        return 
                    }
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [accessToken, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;