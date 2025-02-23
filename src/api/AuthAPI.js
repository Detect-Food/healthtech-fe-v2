import UnauthorApi from "./baseAPI/UnauthorBaseApi";

class AuthAPI {
    constructor() {
        this.url = "/api/auth";
    }

    login = async (username, password) => {
        const body = {
            username: username,
            password: password
        }
        return UnauthorApi.post(`${this.url}/login`, body);
    };


    signUp = async (body) => {
        return UnauthorApi.post(`${this.url}/register`, body);
    };




}

export default new AuthAPI();
