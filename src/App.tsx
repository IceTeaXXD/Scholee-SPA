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
                <Sidebar>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/report" element={<Report />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Sidebar>
            </Router>
        </ChakraProvider>
    )
}

export default App
