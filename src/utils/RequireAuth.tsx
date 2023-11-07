import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const RequireAuth = ({ allowedRoles, refresh }: any) => {
    const location = useLocation();

    useEffect(() => {
        const isAuthorized = refresh.roles === allowedRoles[0]; 
        console.log(isAuthorized);

        if (!isAuthorized) {
            <Navigate to="/unauthorized" state={{ from: location }} replace />;
        }
    }, [allowedRoles, location, refresh]);

    return <Outlet />;
};

export default RequireAuth;
