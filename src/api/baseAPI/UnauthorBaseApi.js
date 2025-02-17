import axios from "axios";

const apiConfig = {
  baseURL: "http://192.168.1.107:5000",
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: apiConfig.headers,
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response !== undefined && response.data !== undefined) {
      // Get all response
      return response.data;
    }
    return response;
  },
  async (error) => {

    // Unauthorized
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized error:", error);
      throw new Error("Either email address or password is incorrect. Please try again");
    }

    // Handle other errors
    throw error;
  }
);


export default axiosClient;
