import UnauthorApi from "./baseAPI/UnauthorBaseApi";

class UserAPI {
    constructor() {
        this.url = "/api/user";
    }

    getAllUsers = async () => {
        const response = await UnauthorApi.get(`${this.url}/get-all-users`);
        return response?.data;
    }


    getUserPhysicalStats = async (userId) => {
        const response = await UnauthorApi.get(`${this.url}/get-user-physical-stats/${userId}`);
        return response?.data;
    }

    updateUserPhysicalStats = async (userId, body) => {
        const response = await UnauthorApi.patch(`${this.url}/update-user-physical-stats/${userId}`, body);
        return response?.data;
    }


    getUserDetails = async (userId) => {
        const response = await UnauthorApi.get(`${this.url}/get-user-details/${userId}`);
        return response?.data;
    }


}

export default new UserAPI();
