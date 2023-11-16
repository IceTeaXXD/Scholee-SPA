/* eslint-disable react-hooks/exhaustive-deps */
import { axiosPrivate } from "../api/axios"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        try {
          await refresh()
          return config
        } catch (error) {
          return Promise.reject(error)
        }
      },
      (error) => Promise.reject(error)
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
    }
  }, [refresh])

  return axiosPrivate
}

export default useAxiosPrivate
