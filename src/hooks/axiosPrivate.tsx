/* eslint-disable react-hooks/exhaustive-deps */
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import Cookies from "js-cookie";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        try {
          // Ensure that the access token is up-to-date before making the request
          await refresh();

          // Set the new access token in the request headers
          // config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return config;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
