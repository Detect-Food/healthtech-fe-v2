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
        console.log(data);
        // {
        //     "age": 17, 
        //     "weight": 52,
        //      "height": 165, 
        //      "gender": "Male",
        //       "note": "khong an ca"
        // }

        return UnauthorApi.post(`${this.url}/generate-meal-plan`, data);
    };


    saveMealPlan = async (userId, mealPlan) => {
        const body = {
            userId: userId,
            mealPlan: mealPlan
        }
        return UnauthorApi.post(`${this.url}/save-meal-plan`, body);
    };


    getNutritionPlan = async (userId) => {
        const response = await UnauthorApi.get(`${this.url}/nutrition/${userId}`);
        return response?.data;
    };


}

export default new FoodAPI();
