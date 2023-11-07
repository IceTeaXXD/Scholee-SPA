import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Home from "./components/Home/Home"
import Unauthorized from "./components/Error/Unauthorized"
import Dashboard from "./components/Dashboard/Dashboard"
import Report from "./components/Report/Report"
import PageNotFound from "./components/Error/PageNotFound"
import Scholarships from "./components/Scholarships/Scholarships"
import Sidebar from "./components/Sidebar/Sidebar"
import RequireAuth from "./utils/RequireAuth"
import Layout from "./components/layout"
import useRefreshToken from "./hooks/useRefreshToken"

const ROLES = {
    Organization: "organization",
    University: "university"
}
function App() {
    const refresh = useRefreshToken();
    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path = "/" element={<Layout/>}>
                        {/* Public Routes */}
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="unauthorized" element={<Unauthorized />} />
                    
                        {/* Protected Routes */}
                        <Route element={ <RequireAuth allowedRoles={[ROLES.University,ROLES.Organization]} refresh={refresh}/>}>
                            <Route path="/" element={
                            <Sidebar>
                                <Home />
=                           </Sidebar>
                            }/>
                        </Route>

                        <Route element={ <RequireAuth allowedRoles={[ROLES.University,ROLES.Organization]} refresh={refresh}/>}>
                            <Route path="dashboard" element={
                            <Sidebar>
                                    <Dashboard />
=                            </Sidebar>
                            }/>
                        </Route>

                        <Route element={ <RequireAuth allowedRoles={[ROLES.University,ROLES.Organization]} refresh={refresh}/>}>
                            <Route path="report" element={
                            <Sidebar>
                                <Report />
=                           </Sidebar>
                            }/>
                        </Route>

                        <Route element={ <RequireAuth allowedRoles={[ROLES.University]} refresh={refresh}/>}>
                            <Route path="scholarships" element={
                            <Sidebar>
                                <Scholarships />
=                           </Sidebar>
                            }/>
                        </Route>

                        <Route path="*" element={<PageNotFound />} />

                    </Route>
                </Routes>
            </Router>
        </ChakraProvider>
    )
}

export default App
