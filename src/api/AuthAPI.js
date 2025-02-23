import UnauthorApi from "./baseAPI/UnauthorBaseApi";

class AuthAPI {
    constructor() {
        this.url = "/api/auth";
    }



    login = async (email, password) => {
        const body = {
            email: email,
            password: password
        }
        return UnauthorApi.post(`${this.url}/login`, body);
    };


    signUp = async (body) => {
        return UnauthorApi.post(`${this.url}/register`, body);
    };




}

export default new AuthAPI();
