import { useContext, useEffect, useState } from "react";
import { DayAPI } from "../../api/day-api";
import { DayList } from "../../components/DayList/DayList";
import { LoginAdvice } from "../../components/LoginAdvice/LoginAdvice";
import { RecommendationQttProt } from "../../components/RecommendationQttProt/RecommendationQttProt";
import DayContext from "../../store/day-context";
import UserContext from "../../store/user-context";

export function DailySummary() {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const userCtx = useContext(UserContext)
    const dayCtx = useContext(DayContext)

    const [isDayDeleted, setIsDayDeleted] = useState("")//id du jour supprimé
    
    useEffect(() => {//garder les infos si on rafraichit la page
        const userData = localStorage.getItem('token-info')
        const parseDataUser = JSON.parse(userData)
        if(parseDataUser) {
            userCtx.setEmail(parseDataUser.email)
            userCtx.setToken(parseDataUser.token)
        }
    },[])

    async function getAll(token,email) {
        const days =await DayAPI.getAll(token, email)
        dayCtx.setDayArray(days)
        localStorage.setItem('day-info', JSON.stringify(days));
    }

    useEffect(() => {
        getAll(userCtx.token, userCtx.email)
    },[userCtx.email, userCtx.token, isDayDeleted,date])

    return(
        <>
            {userCtx.email ?
                (
                    <>
                        <h1 style={{textAlign: 'center'}}>Mon résumé journalier</h1>
                        <RecommendationQttProt />
                        {dayCtx.dayArray.length!==0 &&
                            <>
                            {dayCtx.dayArray[0].email === userCtx.email &&
                                <DayList dayArray={dayCtx.dayArray} details={false} setIsDayDeleted={setIsDayDeleted} />
                            }
                            </>
                        }
                    </>
                )
                :
                (
                    <LoginAdvice />
                )
            }
        </>
    )
}