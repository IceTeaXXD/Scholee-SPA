import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Home from "./pages/Home/Home"
import Dashboard from "./pages/Dashboard/Dashboard"
import Report from "./pages/Report/Report"
import Explore from "./pages/Explore/Explore"
import PageNotFound from "./pages/PageNotFound/PageNotFound"
import Sidebar from "./components/Sidebar/Sidebar"

const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150
}
function App() {
    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <Sidebar>
                                <Home />
                            </Sidebar>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <Sidebar>
                                <Dashboard />
                            </Sidebar>
                        }
                    />
                    <Route
                        path="/report"
                        element={
                            <Sidebar>
                                <Report />
                            </Sidebar>
                        }
                    />
                    <Route
                        path="/explore"
                        element={
                            <Sidebar>
                                <Explore />
                            </Sidebar>
                        }
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </ChakraProvider>
    )
}

export default App
