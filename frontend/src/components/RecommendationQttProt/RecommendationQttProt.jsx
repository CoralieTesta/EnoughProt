import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../store/user-context";
import s from "./style.module.css";

export function RecommendationQttProt() {
    const userCtx = useContext(UserContext)
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const link='/day/'+date

    useEffect(() => {//garder les infos si on rafraichit la page
        const proteinData = localStorage.getItem('quantityProtein-info')
        const parseDataProtein = JSON.parse(proteinData)
        console.log("parse data", parseDataProtein)
        if(parseDataProtein) {
            userCtx.setQttProtPerDay(parseDataProtein)
        }
    },[])

    return(
        <div className={s.container}>
            {userCtx.qttProtPerDay ?
                (<div >
                    Vous avez besoin de <span className={s.qttProt}>{userCtx.qttProtPerDay}g</span> de protéines par jour.
                    <div>Déterminez quelle quantité de protéines vous avez consommé <Link to={link}> aujourd'hui</Link>.</div>
                </div>) :
                (<div >
                    Déterminez quelle quantité de protéines vous avez <Link to='/'>besoin</Link> et quelle quantité vous avez consommé <Link to={link}> aujourd'hui</Link>.
                </div>)
            }
        </div>
    )
}