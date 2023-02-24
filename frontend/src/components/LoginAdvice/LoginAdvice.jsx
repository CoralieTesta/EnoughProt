import s from "./style.module.css"
import { Link } from "react-router-dom"

export function LoginAdvice() {
    return(
        <div className={s.container}>
            <Link to="/login">Connectez-vous</Link> 
        </div>
    )
}