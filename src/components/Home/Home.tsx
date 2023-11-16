import { useEffect, useState } from "react"
import { handleGetInfo } from "../../utils/auth"
import UniversityHome from "./UniversityHome"
import OrganizationHome from "./OrganizationHome"

const Home = () => {
  const [userInfo, setUserInfo] = useState({
    user_id: 0,
    name: "",
    email: "",
    role: ""
  })
  const getInfo = async () => {
    const response = await handleGetInfo()
    setUserInfo({
      user_id: response?.data.user_id,
      name: response?.data.name,
      email: response?.data.email,
      role: response?.data.roles
    })
  }

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <>
      {userInfo.role === "university" ? (
        <UniversityHome />
      ) : userInfo.role === "organization" ? (
        <OrganizationHome />
      ) : (
        <></>
      )}
    </>
  )
}

export default Home
