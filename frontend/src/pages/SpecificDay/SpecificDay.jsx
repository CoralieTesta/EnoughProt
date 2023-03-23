import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { DayAPI } from "../../api/day-api";
import { AddButton } from "../../components/AddButton/AddButton"
import { DayItem } from "../../components/DayItem/DayItem";
import UserContext from "../../store/user-context";
import { useParams } from "react-router-dom";
import { LoginAdvice } from "../../components/LoginAdvice/LoginAdvice";
import DayContext from "../../store/day-context";

export function SpecificDay() {
    const [foodItemDeleted,setFoodItemDeleted] =useState("")//id de l'aliment supprimé pour recharger la page
    const [dayCreated,setDayCreated]=useState("")
    const {day_date,month_date,year_date} = useParams();
    var date=day_date+'/'+month_date+'/'+year_date
    const current_today = new Date();
    const date_today = `${current_today.getDate()}/${current_today.getMonth()+1}/${current_today.getFullYear()}`;

    const dayCtx = useContext(DayContext)

    if(!date){
        const current = new Date();
        date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        }
    const navigate = useNavigate()
    const userCtx = useContext(UserContext)
    const [day, setDay] = useState()

    useEffect(() => {//garder les infos si on rafraichit la page
        const userData = localStorage.getItem('token-info')
        const parseData = JSON.parse(userData)
        if(parseData) {
            userCtx.setEmail(parseData.email)
            userCtx.setToken(parseData.token)
        }
    },[])

    function addFoodHandler() {
        navigate('/addFood')
    }

    async function getADay(token,email, date) {
        const day =await DayAPI.getADay(token, email, date)
        setDay(day)
    }

    function addDayHandler() {
        if(userCtx.email) {
            addDay(userCtx.token,{email:userCtx.email, date:date, food:[]})
            navigate('/dailySummary')
        }
    }

    async function addDay(token, data) {
        const response = await DayAPI.create(token, data).then(function(response) { 
                                                            return response
                                                        })//vaut false s'il y a eu une erreur
        
        console.log("reponse", response)
        if(response) {
            setDayCreated(data.email)
            getAll(userCtx.token, userCtx.email)
        }
        else {
            alert("Données incorrectes")
        }
    }

    useEffect(() => {
        if(! dayCtx.isTodayInArray()) {
            addDayHandler()
        }
        getADay(userCtx.token, userCtx.email, date)
    },[userCtx.email, userCtx.token, date,foodItemDeleted,dayCreated])

    async function getAll(token,email) {
        const days =await DayAPI.getAll(token, email)
        dayCtx.setDayArray(days)
        localStorage.setItem('day-info', JSON.stringify(days));
    }

    return(
        <>
            {userCtx.email?
                (
                    <>
                        {date===date_today &&
                            <>
                                <div 
                                    style={{
                                        marginLeft:30,
                                        marginRight:30,
                                        fontSize:20,
                                        marginBottom:20
                                }}>
                                    Ajoutez ce que vous avez mangé aujourd'hui pour déterminer la quantité de protéines consommée.
                                </div>
                                <AddButton 
                                onClickHandler={addFoodHandler} 
                                text="Ajouter un aliment"
                                icon="bucket"/>
                            </>
                        }       
                        <h2 style={{marginLeft:20}}>Détails :</h2>
                        {day && 
                            <DayItem 
                                date={date} 
                                food={day.food} 
                                details={true} 
                                id={day._id} 
                                setFoodItemDeleted={setFoodItemDeleted} 
                            />
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