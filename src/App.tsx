/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import Login from "./components/Login/Login"
import RegisterOrg from "./components/Register/RegisterOrg"
import RegisterUni from "./components/Register/RegisterUniversity"
import Unauthorized from "./components/Error/Unauthorized"
import Report from "./components/Report/OrganizationReport"
import PageNotFound from "./components/Error/PageNotFound"
import Scholarships from "./components/Scholarships/Scholarships"
import Sidebar from "./components/Sidebar/Sidebar"
import RequireAuth from "./utils/RequireAuth"
import Layout from "./components/layout"
import AssignmentDetails from "./components/Assignment/AssignmentDetails"
import Acceptance from "./components/Acceptance/Acceptance"
import { Submissions } from "./components/Assignment/Submission"
import Dashboard from "./components/Dashboard/Dashboard"
import Home from "./components/Home/Home"

const ROLES = {
  Organization: "organization",
  University: "university"
}
function App() {
  const activeLabelStyles = {
    transform: "scale(0.85) translateY(-24px)"
  }
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
              "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
                {
                  ...activeLabelStyles
                },
              label: {
                top: 0,
                left: 0,
                zIndex: 2,
                position: "absolute",
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
  })
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route path="login" element={<Login />} />
            <Route path="register-org" element={<RegisterOrg />} />
            <Route path="register-uni" element={<RegisterUni />} />
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
                    <Home />
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
                    <Dashboard />
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
                    <Acceptance />
                  </Sidebar>
                }
              />
            </Route>

            <Route
              element={<RequireAuth allowedRoles={[ROLES.Organization]} />}
            >
              <Route
                path="scholarships/:scholarshipid/assignments/:assignmentid/submissions"
                element={
                  <Sidebar>
                    <Submissions />
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
