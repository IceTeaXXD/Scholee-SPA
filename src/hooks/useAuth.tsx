import {useContext, useDebugValue} from "react";
import AuthContext from "../context/AuthProvider"

const useAuth = () => {
    const {auth, setAuth} : any = useContext(AuthContext)
    useDebugValue(auth, auth => auth?.email ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;