import { FoodFormCustomized } from "../FoodFormCustomized/FoodFormCustomized"
import s from "./style.module.css"

export function AddFoodCustomized() {
    return(
        <div className={s.container}>
            <h2 className={s.title}>Option 2 : Ajoutez un aliment personnalisé</h2>
            <FoodFormCustomized />
        </div>
    )
}