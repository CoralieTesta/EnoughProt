import axios from "axios"
const BASE_URL = "http://localhost:3000/api/day"
//"https://enoughprot.onrender.com/api/day"

export class DayAPI{
    static async create(token, day) {
        console.log("ici",day)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return (
                await axios.post(`${BASE_URL}/create`, day)
                .catch(function(error) {
                    if (error.response) {
                        console.log("error status",error.response.status);
                        return false
                    }
                }
                )
            )
    }

    static async getAll(token, email) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${BASE_URL}/allDays/${email}`)
        return (
            response.data
        )
    }

    static async getADay(token,email, date) { //data = email,date
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log("**",email,date)
        const response = await axios.get(
            `${BASE_URL}/specificDay/${email}/${date}`)
        console.log("response", response.data)
        return (
            response.data
        )
    }

    static async getADayNotInDB(token,email, date) { //data = email,date
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log("**",email,date)
        const response = await axios.get(
            `${BASE_URL}/specificDayNotInDB/${email}/${date}`)
        console.log("response", response.data)
        return (
            response.data
        )
    }

    static async addFood(token, foodObject,data) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.put(
            `${BASE_URL}/addFood/${foodObject.name}/${foodObject.quantity}/${foodObject.quantityProtein}`
            ,data)
        return (
            response.data
        )
    }

    static async removeFood(token, foodId, dayId) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.put(
            `${BASE_URL}/removeFood`,{foodId,dayId})
        return (
            response.data
        )
    }
    

    static async deleteDay(token, dayId) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.delete(
            `${BASE_URL}/delete/${dayId}`)
        return (
            response.data
        )
    }

}
