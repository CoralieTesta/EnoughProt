import axios from "axios"
const BASE_URL = "https://enough-prot-mqpxl2qhw-coralietesta.vercel.app/api/auth/"


export class UserAPI{
    static async create(user) {
        return (
            await axios.post(`${BASE_URL}/signup`, user)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            }
        ))
    }

    static async connect(user) {
        return (
            await axios.post(`${BASE_URL}/login`, user)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            }
        ))
    }
}
