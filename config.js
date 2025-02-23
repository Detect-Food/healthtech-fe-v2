import Constants from "expo-constants";

const healthTechApi = Constants.expoConfig.extra.healthTechApi;


const apiConfig = {
    baseURL: healthTechApi,
    headers: {
        "Content-Type": "application/json",
    },
};

export default apiConfig;
