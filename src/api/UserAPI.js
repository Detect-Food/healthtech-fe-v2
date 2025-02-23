import UnauthorApi from "./baseAPI/UnauthorBaseApi";

class UserAPI {
    constructor() {
        this.url = "/api/user";
    }

    getAllUsers = async () => {
        const response = await UnauthorApi.get(`${this.url}/get-all-users`);
        return response.data;
    }

}

export default new UserAPI();
