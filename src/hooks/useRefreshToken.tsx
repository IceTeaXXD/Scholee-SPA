import axios from '../api/axios';
import Cookies from 'js-cookie';
const useRefreshToken = () => {

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        console.log("set auth from refresh")
        Cookies.set('accToken', response.data.accessToken)
        return response.data;
    }
    return refresh;
};

export default useRefreshToken;
