import axios from '../api/axios';
import Cookies from 'js-cookie';
const useRefreshToken = () => {
    const refresh = async () => {
        const response = await axios.get('http://localhost:5001/api/refresh', {
        });
        return response.data;
    }
    return refresh;
};

export default useRefreshToken;
