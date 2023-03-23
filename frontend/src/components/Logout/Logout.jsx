import { BsBoxArrowRight } from "react-icons/bs"
import s from "./style.module.css"

export function Logout() {
    function logoutHandler() {
        localStorage.removeItem('token-info')
        localStorage.removeItem('day-info')
        localStorage.removeItem('quantityProtein-info')
        window.location.reload(false);
    }

    return(
        <div className={s.container}>
            <div onClick={logoutHandler} className={s.logout}>
                Déconnexion <div className={s.logoutIcon}><BsBoxArrowRight size={35}/></div>
            </div>
        </div>
    )
}