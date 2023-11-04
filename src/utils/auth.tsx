function setAuthToken(token: string) {
    localStorage.setItem("token", token);
}

type Payload = {
    email : string;
    roles : string;
}
function getAuthData(): Payload {
    const tokentest = localStorage.getItem("token");
    console.log(tokentest)
    return {
        email : "",
        roles : "",
    }
}
export {
    setAuthToken,
    getAuthData
}