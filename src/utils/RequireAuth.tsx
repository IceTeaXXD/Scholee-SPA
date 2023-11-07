import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }: any) => {
    const { auth }: any = useAuth();
    const location = useLocation();
    const userRoles = Array.isArray(auth.roles) ? auth.roles : [auth.roles];
    
    // Check if the user's roles match any of the allowed roles
    const isAuthorized = userRoles.some((role: string) => allowedRoles.includes(role));
    console.log(isAuthorized)
    if (isAuthorized) {
        return <Outlet />;
    } else if (auth.user) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};

export default RequireAuth;
