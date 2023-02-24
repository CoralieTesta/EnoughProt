import { WeightForm } from "../WeightForm/WeightForm"
import s from "./style.module.css"

export function CalculateSection() {
    return(
        <section className={s.container}>
            <div className={s.info}>
                Déterminez la quantité minimale de protéines dont vous avez besoin :
            </div>
            <WeightForm />
        </section>
    )
}