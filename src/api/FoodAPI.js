import UnauthorApi from "./baseAPI/UnauthorBaseApi";

class FoodAPI {
    constructor() {
        this.url = "/api/meal";
    }

    genFood = async (data) => {
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
