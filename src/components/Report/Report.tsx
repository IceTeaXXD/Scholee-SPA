import { useEffect, useState } from "react"
import { handleGetInfo } from "../../utils/auth"
import OrganizationReport from "./OrganizationReport"
import UniversityReport from "./UniversityReport"

const Report = () => {
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
      {String(userInfo.role) === "university" ? (
        <UniversityReport />
      ) : String(userInfo.role) === "organization" ? (
        <OrganizationReport />
      ) : (
        <></>
      )}
    </>
  )
}

export default Report
