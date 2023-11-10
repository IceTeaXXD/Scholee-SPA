import axios from "axios"
import Cookies from "js-cookie"
import useRefreshToken from "../hooks/useRefreshToken"
axios.defaults.withCredentials = true

async function handleLogin(email: string, password: string) {
    try {
        const response = await axios.post("http://localhost:5001/api/login", {
            email,
            password,
            withCredentials: true
        })
        if (response.status === 200) {
            return {
                status: "success",
                message: "Login Success",
                email: email,
                roles: response.data.userType,
                accToken: response.data.accessToken
            }
        } else {
            return {
                status: "error",
                message: "Credentials not match"
            }
        }
    } catch (error: any) {
        console.error(`Error fetching data: ${error}`)
    }
}

async function handleLogout() {
    try {
      const response = await axios.post('http://localhost:5001/api/logout');
      return response.data;
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
};

async function handleGetRoles() {
    try {
        const accToken = Cookies.get('accToken');
        if (accToken){
            const response = await axios.get("http://localhost:5001/api/roles", {
                headers: {
                    Authorization: `Bearer ${accToken}`
                }
            });
            return response;
        }
    } catch (error) {
        console.error('Error during getting roles:', error);
        throw error;
    }
}
export { handleLogin, handleLogout, handleGetRoles }
