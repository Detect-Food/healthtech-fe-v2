
import UnauthorApi from "./baseAPI/UnauthorBaseApi";

class TransactionAPI {
    constructor() {
        this.url = "/api/chatbot";
    }

    chatWithAi = async (promt) => {
        const body = {
            promt: promt
        }
        const response = await UnauthorApi.post(`${this.url}/chat`, body);
        console.log(response?.data);
        
        return response?.data;
    }



}

export default new TransactionAPI();
