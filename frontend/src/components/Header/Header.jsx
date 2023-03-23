import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../../store/user-context"
import { Logo } from "../Logo"
import { BsBoxArrowRight } from "react-icons/bs"
import s from "./style.module.css"

export function Header() {
    const navigate = useNavigate()
    const userCtx = useContext(UserContext)
    

    useEffect(() => { //garder les infos si on rafraichit la page
        const userData = localStorage.getItem('token-info')
        const parseData = JSON.parse(userData)
        if(parseData) {
            userCtx.setEmail(parseData.email)
            userCtx.setToken(parseData.token)
        }
    },[])

    function logoutHandler() {
        localStorage.removeItem('token-info')
        localStorage.removeItem('day-info')
        localStorage.removeItem('quantityProtein-info')
        window.location.reload(false);
    }

    return(
        <header>
            <div className={s.upperContainer}>
                <Logo 
                    title="EnoughProt" 
                    subtitle="Improve your performance" 
                    image="💪" 
                    onClick={() => navigate("/dailySummary")} 
                />
                <div className={s.helloContainer}>
                <div className={s.hello}>
                        Bonjour {userCtx.email}
                    </div>
                    <div onClick={logoutHandler} className={s.logout}>
                        LOGOUT <div className={s.logoutIcon}><BsBoxArrowRight/></div>
                    </div>
                </div>
            </div>
        </header>
    )
}