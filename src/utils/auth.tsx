import axios from "axios"
axios.defaults.withCredentials = true
function setAuth(token: string) {
    localStorage.setItem("token", token)
}

type Payload = {
    email: string
    roles: string
}
async function getAuthData(): Promise<Payload> {
    const tokentest = localStorage.getItem("token")
    console.log(tokentest)
    try {
        const response = await axios.get("http://localhost:5001/api/refresh", {
            withCredentials: true
        })
        console.log("-------kkkkk")
        console.log(response)
        return {
            // email: response.data.email,
            // roles: response.data.roles,
            email: "",
            roles: ""
        }
    } catch (error) {
        console.error(`Error fetching data: ${error}`)
        return {
            email: "",
            roles: ""
        }
    }
}
async function handleLogin(email: string, password: string) {
    try {
        const response = await axios.post("http://localhost:5001/api/login", {
            email,
            password,
            withCredentials: true
        })
        if (response.status === 200) {
            console.log("Login Success")
            setAuth(response.data.accessToken)
            // return json
            return {
                status: "success",
                message: "Login Success"
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
export { setAuth, getAuthData, handleLogin }
