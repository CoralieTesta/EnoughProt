import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DayAPI } from "../../api/day-api"
import DayContext from "../../store/day-context"
import UserContext from "../../store/user-context"
import s from "./style.module.css"

export function FoodResults({quantityProtein, quantity, food}) {
    const navigate = useNavigate()
    const userCtx=useContext(UserContext)
    const dayCtx=useContext(DayContext)
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    useEffect(() => {//garder les infos si on rafraichit la page
        const userData = localStorage.getItem('token-info')
        const parseDataUser = JSON.parse(userData)
        if(parseDataUser) {
            userCtx.setEmail(parseDataUser.email)
            userCtx.setToken(parseDataUser.token)
        }

        const dayData = localStorage.getItem('day-info')
        const parseDataDay = JSON.parse(dayData)
        if(parseDataDay) {
            dayCtx.setDayArray(parseDataDay)
        }
    },[])

    async function addFood() {
        const foodObject = {name:food, quantity:quantity, quantityProtein:quantityProtein}
        await DayAPI.addFood(userCtx.token, foodObject, 
        {
            email:userCtx.email,
            date: date
        })
        navigate("/day/"+date)
    }

    return(
        <div className={s.container}>
            <h2 className={s.title}>Résultat : </h2>
            {quantity && food && quantityProtein &&
                `${quantity} (de) ${food} contient ${quantityProtein} g de protéines.`
            }    
            {quantity && food && quantityProtein &&
                <div>
                    {userCtx.email && dayCtx.isTodayInArray() &&
                        <button 
                            className={s.button}
                            onClick={addFood}
                        >
                                Ajouter à Aujourd'hui
                        </button>
                    }
              </div>
            }   
        </div>
    )
}