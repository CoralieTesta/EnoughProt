import s from "./style.module.css"
import { useContext, useState } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { UserAPI } from "../../api/user-api";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/user-context";
import { Logout } from "../../components/Logout/Logout";

export function Login() {
    const [connect, setConnect] = useState(true)
    const navigate = useNavigate()
    const userCtx = useContext(UserContext)

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

    async function addUserHandler(userData) {
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
        if(response) {
            userCtx.setEmail(userData.email)
            userCtx.setToken(response.data.token)
            const token= response.data.token
            const dataUserToStore = {
                ...userData,
                token: token,
            };
            localStorage.setItem('token-info', JSON.stringify(dataUserToStore));
            navigate("/dailySummary")
        }
        else {
            alert("Données incorrectes")
        }
    }

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