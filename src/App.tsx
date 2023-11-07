import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Home from "./pages/Home/Home"
import Unauthorized from "./pages/Error/Unauthorized"
import OrganizationDashboard from "./pages/Dashboard/OrganizationDashboard"
import UniversityDashboard from "./pages/Dashboard/UniversityDashboard"
import OrganizationReport from "./pages/Report/OrganizationReport"
import UniversityReport from "./pages/Report/UniversityReport"
import PageNotFound from "./pages/Error/PageNotFound"
import Scholarships from "./pages/Scholarships/Scholarships"
import Sidebar from "./components/Sidebar/Sidebar"
import { useContext } from "react"
import AuthContext from "./context/AuthProvider"
import RequireAuth from "./utils/RequireAuth"

const ROLES = {
    Organization: 2021,
    University: 2022
}
function App() {
    const { auth }: any = useContext(AuthContext)
    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    {/* PUBLIC ROUTES */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route path="*" element={<PageNotFound />} />

                    {/* PROTECTED ROUTES */}
                    {/* Home Page */}
                    <Route
                        path="/"
                        element={
                            <Sidebar>
                                <RequireAuth
                                    allowedRoles={[
                                        ROLES.Organization,
                                        ROLES.University
                                    ]}
                                >
                                    <Home />
                                </RequireAuth>
                            </Sidebar>
                        }
                    />

                    {/* Dashboard */}
                    <Route
                        path="/dashboard"
                        element={
                            <Sidebar>
                                {auth?.role === ROLES.Organization ? (
                                    <RequireAuth
                                        allowedRoles={[ROLES.Organization]}
                                    >
                                        <OrganizationDashboard />
                                    </RequireAuth>
                                ) : (
                                    <RequireAuth
                                        allowedRoles={[ROLES.University]}
                                    >
                                        <UniversityDashboard />
                                    </RequireAuth>
                                )}
                            </Sidebar>
                        }
                    />

                    {/* Report */}
                    <Route
                        path="/report"
                        element={
                            <Sidebar>
                                {auth?.role === ROLES.Organization ? (
                                    <RequireAuth
                                        allowedRoles={[ROLES.Organization]}
                                    >
                                        <OrganizationReport />
                                    </RequireAuth>
                                ) : (
                                    <RequireAuth
                                        allowedRoles={[ROLES.University]}
                                    >
                                        <UniversityReport />
                                    </RequireAuth>
                                )}
                            </Sidebar>
                        }
                    />

                    {/* Scholarships */}
                    <Route
                        path="/scholarships"
                        element={
                            <Sidebar>
                                <RequireAuth
                                    allowedRoles={[ROLES.Organization]}
                                >
                                    <Scholarships />
                                </RequireAuth>
                            </Sidebar>
                        }
                    />
                </Routes>
            </Router>
        </ChakraProvider>
    )
}

export default App
