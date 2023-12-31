import { useLocation, Outlet, useNavigate } from "react-router-dom"
import { useState } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import { handleGetInfo } from "./auth"

const RequireAuth = ({ allowedRoles }: any) => {
  const location = useLocation()
  const [, setUserRoles] = useState([])

  const navigate = useNavigate()
  const refresh = useRefreshToken()
  const fetchData = async () => {
    try {
      const response = await handleGetInfo()
      const roles = response?.data.roles
      setUserRoles(roles)
      if (roles) {
        const isAuthorized = allowedRoles.includes(roles)
        if (!isAuthorized) {
          navigate("/unauthorized", { state: { from: location } })
        }
      } else {
        try {
          await refresh()
          const refreshedResponse = await handleGetInfo()
          const roles = refreshedResponse?.data.roles
          setUserRoles(roles)
          const isAuthorized = allowedRoles.includes(roles)
          if (!isAuthorized) {
            navigate("/unauthorized", { state: { from: location } })
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError)
          navigate("/login", { state: { from: location } })
        }
      }
    } catch (error) {
      console.error("Error fetching roles:", error)
      try {
        await refresh()
        const refreshedResponse = await handleGetInfo()
        const roles = refreshedResponse?.data.roles
        setUserRoles(roles)

        const isAuthorized = allowedRoles.includes(roles)

        if (!isAuthorized) {
          navigate("/unauthorized", { state: { from: location } })
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError)
        navigate("/login", { state: { from: location } })
      }
    }
  }

  fetchData()

  return <Outlet />
}

export default RequireAuth
