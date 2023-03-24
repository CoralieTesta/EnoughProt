import { useNavigate } from "react-router-dom"
import s from "./style.module.css"

export function Nav() {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const navigate = useNavigate()
    return(
        <nav className={s.nav}>
            <button onClick={() => navigate("/")} className={s.button}>
            Home
            </button>
            <button onClick={() => navigate("/dailySummary")} className={s.button}>
                Mon résumé journalier
            </button>
            <button onClick={() => navigate("/food")} className={s.button}>
                Informations nutritionnelles
            </button>
            <button onClick={() => navigate("/login")} className={s.button}>
                Login
            </button>
        </nav>
    )
}