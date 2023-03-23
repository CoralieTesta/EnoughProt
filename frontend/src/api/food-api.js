import axios from "axios"
const BASE_URL = "https://api.edamam.com/api/nutrition-data?app_id=41f60d86&app_key=fa7f6b4e17f049969f9f03aab4fb6abd&nutrition-type=cooking&ingr="


export class FoodAPI{
    static async getProtein(quantity, food) {
        return (
            await axios.get(`${BASE_URL}${quantity}%20of%20${food}`)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            }
        ))
    }
}
