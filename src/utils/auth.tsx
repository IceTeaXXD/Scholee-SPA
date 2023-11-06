import axios from 'axios';
axios.defaults.withCredentials = true;
function setAuth(token: string) {
    localStorage.setItem("token", token);
}

type Payload = {
    email : string;
    roles : string;
}
async function getAuthData(): Promise<Payload> {
    const tokentest = localStorage.getItem("token");
    console.log(tokentest);
    try {
        const response = await axios.get('http://localhost:5001/api/refresh', {
            withCredentials: true,
        });
        console.log("-------kkkkk")
        console.log(response)
        return {
            // email: response.data.email,
            // roles: response.data.roles,
            email: "",
            roles: "",
        };
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        return {
            email: "",
            roles: "",
        };
    }
}
export {
    setAuth,
    getAuthData
}