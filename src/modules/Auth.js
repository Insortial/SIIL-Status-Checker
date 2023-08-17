import { useLocation, Navigate, Outlet } from "react-router-dom";
import { UserInfo } from "./UserInfoContext";

function Auth() {
    const { loggedIn } = UserInfo()
    const location = useLocation();
    
    return (
        loggedIn && loggedIn !== "none" ? <Outlet /> : <Navigate to="/login"  state={{ from: location }} replace /> 
    )
}

export default Auth
