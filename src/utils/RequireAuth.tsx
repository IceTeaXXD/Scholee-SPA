import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { handleGetRoles } from '../utils/auth';
import useRefreshToken from '../hooks/useRefreshToken';

const RequireAuth = ({ allowedRoles }: any) => {
  const location = useLocation();
  const [userRoles, setUserRoles] = useState([]);
  const navigate = useNavigate();
  const refresh = useRefreshToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleGetRoles();
        const roles = response?.data.roles;
        setUserRoles(roles);

        const isAuthorized = allowedRoles.includes(roles);
        console.log(isAuthorized);

        if (!isAuthorized) {
          console.log("Unauthorized");
          navigate('/unauthorized', { state: { from: location } });
        }
      } catch (error) {
        console.error('Error fetching roles:', error);

        try {
          await refresh();
          const refreshedResponse = await handleGetRoles();
          const roles = refreshedResponse?.data.roles;
          setUserRoles(roles);

          const isAuthorized = allowedRoles.includes(roles);
          console.log(isAuthorized);

          if (!isAuthorized) {
            console.log("Unauthorized after refresh");
            navigate('/unauthorized', { state: { from: location } });
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          navigate('/login', { state: { from: location } });
        }
      }
    };

    fetchData();
  }, [allowedRoles, location, navigate, refresh]);

  return <Outlet />;
};

export default RequireAuth;
