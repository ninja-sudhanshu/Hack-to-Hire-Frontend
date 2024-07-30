import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const accessToken = localStorage.getItem("access-token");
    if(accessToken === undefined || accessToken === null || accessToken.trim().length === 0){
        return <Navigate to="/login" />
    }
    return <Outlet/>
}

export default ProtectedRoutes;