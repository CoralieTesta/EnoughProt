import s from "./style.module.css"
import { useContext, useState } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { UserAPI } from "../../api/user-api";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/user-context";
import { Logout } from "../../components/Logout/Logout";
import { DayAPI } from "../../api/day-api";
import DayContext from "../../store/day-context";

export function Login() {
    const [connect, setConnect] = useState(true)
    const navigate = useNavigate()
    const userCtx = useContext(UserContext)
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const dayCtx = useContext(DayContext)
    const yo = 0
    console.log(yo)

    function connectHandler() {
        if(!connect){
            setConnect(true)
        }
    }
    
    function loginHandler() {
        if(connect){
            setConnect(false)
        }
    }

    async function getAll(token,email) {
        const days =await DayAPI.getAll(token, email)
        dayCtx.setDayArray(days)
        localStorage.setItem('day-info', JSON.stringify(days));
    }

    function addDayHandler(token,email,date) {
        //if(userCtx.email) {
            addDay(token,{email:email, date, food:[]})
            //navigate('/day/'+date)
        //}
    }

    async function addDay(token, data) {
        const response = await DayAPI.create(token, data).then(function(response) { 
                                                            return response
                                                        })//vaut false s'il y a eu une erreur
        
        console.log("reponse addDay", response)
        if(response) {
            getAll(userCtx.token, userCtx.email)
        }
        else {
            alert("Données incorrectes")
        }
    }


    async function getADayNotInDB(token, email, date) {
        console.log("getADayNotInDB", token,email, date)
        const response = await DayAPI.getADayNotInDB(token, email, date)
                                        .then(function(response) { 
                                            return response
                                        })
        if(response) {
            console.log("not exists")
            addDayHandler(token,email,date)
            console.log("end adddayHandler")
        }
        else {
            console.log("exists")
        }
        console.log("end")
    }

    async function addUserHandler(userData) {
        console.log('data',userData)
        const response= await UserAPI.create(userData)
                            .then(function(response) { 
                                return response
                            })//vaut false s'il y a eu une erreur
        if(response) {
            alert("Inscription validée, connectez-vous")
        }
        else {
            alert("Vous êtes déjà inscrit, connectez-vous")
        }  
        setConnect(true)  
    }

    async function connectUserHandler(userData) {
        const response = await UserAPI.connect(userData)
                            .then(function(response) { 
                                return response
                             })
        console.log("reponse", response)
        if(response) {
            userCtx.setEmail(userData.email)
            userCtx.setToken(response.data.token)
            const token= response.data.token
            const dataUserToStore = {
                ...userData,
                token: token,
            };
            getADayNotInDB(token,userData.email,date)
            localStorage.setItem('token-info', JSON.stringify(dataUserToStore));
            navigate("/")
        }
        else {
            alert("Données incorrectes")
        }
    }//k

    return(
        <div>
            
            {userCtx.email ?
                (<div>
                    <h1 style={{textAlign: 'center'}}>Logout</h1>
                    <Logout />
                </div>
                )
                :
                (<>
                    <h1 style={{textAlign: 'center'}}>Login</h1>
                    <div className={s.buttons}>
                        <button 
                            style={{backgroundColor: connect? "Indigo" : "white", 
                                    color: connect? "white" : "black"
                                }}
                            onClick={connectHandler}
                            className={s.button}
                        >
                                Se connecter
                        </button>
                        <button 
                            style={{backgroundColor: connect? "white" : "Indigo", 
                                    color: connect? "black" : "white"
                                    }}
                            onClick={loginHandler}
                            className={s.button}
                        >
                                S'inscire
                        </button>
                    </div>
                    <div className={s.title}>
                        {connect? <h2>Connectez-vous</h2> : <h2>Inscrivez-vous</h2>}
                    </div>
                    <div>
                        {connect?
                            (
                                <LoginForm onConnectUser={connectUserHandler} connectMode={connect} />
                            ) : (
                                <LoginForm onConnectUser={addUserHandler} connectMode={connect} />
                            )
                        }
                    </div>
                </>
                )
            }
        </div>
    )
}