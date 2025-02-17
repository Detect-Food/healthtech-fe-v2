import UnauthorApi from "./baseAPI/UnauthorBaseApi";

class FoodAPI {
    constructor() {
        this.url = "/api/meal";
    }

    //   // Lấy tất cả hình ảnh
    //   getAllImages = async () => {
    //     return UnauthorApi.get(`${this.url}/get-all-images`);
    //   }

    genFood = async (data) => {
        return UnauthorApi.post(`${this.url}/generate-meal-plan`, data);
    };


}

export default new FoodAPI();
