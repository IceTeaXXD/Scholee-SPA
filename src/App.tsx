import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
function App() {
    return (
        <ChakraProvider>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Router>
            </div>
        </ChakraProvider>
    );
}

export default App;