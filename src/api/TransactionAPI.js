import UnauthorApi from "./baseAPI/UnauthorBaseApi";

class TransactionAPI {
    constructor() {
        this.url = "/api/transaction";
    }

    getNewTransaction = async (id) => {
        const response = await UnauthorApi.post(`${this.url}/add-transaction`, { id });
        return response?.data;
    }
    getAllTransactions = async () => {
        const response = await UnauthorApi.get(`${this.url}/get-all-transactions`);
        return response?.data;
    }


}

export default new TransactionAPI();
