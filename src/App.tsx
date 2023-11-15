import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import Login from "./components/Login/Login"
import RegisterOrg from "./components/Register/RegisterOrg" 
import RegisterUni from "./components/Register/RegisterUniversity"
import Home from "./components/Home/Home"
import Unauthorized from "./components/Error/Unauthorized"
import Report from "./components/Report/Report"
import PageNotFound from "./components/Error/PageNotFound"
import Scholarships from "./components/Scholarships/Scholarships"
import Sidebar from "./components/Sidebar/Sidebar"
import RequireAuth from "./utils/RequireAuth"
import Layout from "./components/layout"
import AssignmentDetails from "./components/Assignment/AssignmentDetails"
import useRefreshToken from "./hooks/useRefreshToken"
import { useEffect, useState } from "react"
import { OrganizationDashboard } from "./components/Dashboard/OrganizationDashboard"
import { UniversityDashboard } from "./components/Dashboard/UniversityDashboard"
import { handleGetInfo } from "./utils/auth"
import UniversityHome from "./components/Home/UniversityHome"

const ROLES = {
  Organization: "organization",
  University: "university"
}
function App() {
  const refresh = useRefreshToken()
  useEffect(() => {
    refresh().catch((error) => {
      // console.error("An error occurred while refreshing the token:", error)
    })
  }, [refresh])

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
  const activeLabelStyles = {
    transform: "scale(0.85) translateY(-24px)"
  };
  const theme = extendTheme({
    components: {
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles
                }
              },
              "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                ...activeLabelStyles
              },
              label: {
                top: 0,
                left: 0,
                zIndex: 2,
                position: "absolute",
                // backgroundColor: "white",
                pointerEvents: "none",
                mx: 3,
                px: 1,
                my: 2,
                transformOrigin: "left top"
              }
            }
          }
        }
      }
    }
  });  
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route path="login" element={<Login />} />
            <Route path="register-org" element={<RegisterOrg />} />
            <Route path="register-uni" element={<RegisterUni/>} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* Protected Routes */}
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES.University, ROLES.Organization]}
                />
              }
            >
              <Route
                path="/"
                element={
                  <Sidebar>
                    {userInfo.role === "organization" ? (
                      <Home />
                    ) : (
                      <UniversityHome />
                    )}
                  </Sidebar>
                }
              />
            </Route>

            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES.University, ROLES.Organization]}
                />
              }
            >
              <Route
                path="dashboard"
                element={
                  <Sidebar>
                    {userInfo.role === "organization" ? (
                      <OrganizationDashboard />
                    ) : (
                      <UniversityDashboard />
                    )}
                  </Sidebar>
                }
              />
            </Route>

            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES.University, ROLES.Organization]}
                />
              }
            >
              <Route
                path="report"
                element={
                  <Sidebar>
                    <Report />
                  </Sidebar>
                }
              />
            </Route>

            <Route
              element={<RequireAuth allowedRoles={[ROLES.Organization]} />}
            >
              <Route
                path="scholarships"
                element={
                  <Sidebar>
                    <Scholarships />
                  </Sidebar>
                }
              />
            </Route>

            <Route
              element={<RequireAuth allowedRoles={[ROLES.Organization]} />}
            >
              <Route
                path="scholarships/:scholarshipid/assignments"
                element={
                  <Sidebar>
                    <AssignmentDetails />
                  </Sidebar>
                }
              />
            </Route>

            <Route
              element={<RequireAuth allowedRoles={[ROLES.Organization]} />}
            >
              <Route
                path="scholarships/:scholarshipid/acceptance"
                element={
                  <Sidebar>
                    <Scholarships />
                  </Sidebar>
                }
              />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
