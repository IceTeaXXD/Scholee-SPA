import axios from "../api/axios"

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/refresh"
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
  return refresh
}

export default useRefreshToken
