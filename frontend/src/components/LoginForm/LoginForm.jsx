import { useContext, useRef, useState } from "react"
import UserContext from "../../store/user-context"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import s from "./style.module.css"

export function LoginForm({onConnectUser, connectMode}) {
    const userCtx = useContext(UserContext)
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const [passwordShown, setPasswordShown] = useState(false)

    function submitHandler(e) {
        userCtx.setQttProtPerDay(null)
        e.preventDefault()
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        const user = {
            email: enteredEmail,
            password: enteredPassword
        }
        onConnectUser(user)     
    }

    const [errorMessage, setErrorMessage] = useState('')
    var validator = require('validator')
    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 0
        })) {
            setErrorMessage('Mot de passe sécurisé')
        } 
        else {
            setErrorMessage('Mot de passe faible')
        }  
    }

    function togglePassword() {
        setPasswordShown(!passwordShown)
    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <div className={s.el}>
                    <label className={s.label} htmlFor="email">Adresse email: </label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        ref={emailInputRef}
                        autoFocus
                    />
                </div>
                <div className={s.el}>
                    <div className={s.pwContainer}>
                        <label className={s.label} htmlFor="password">Mot de passe: </label>
                        <div className={s.inputPwContainer}>
                            <input
                                type={passwordShown ? "text" : "password"}
                                id="password"
                                name="password"
                                ref={passwordInputRef}
                                onChange={(e) => validate(e.target.value)}
                                className={s.inputPw}
                            />
                            <div onClick={togglePassword} className={s.eyeIcon}>
                                {passwordShown?
                                    (<BsEyeSlash/>)
                                    :
                                    (<BsEye/>)
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                    {!connectMode &&
                        <span style={{
                            fontWeight: 'bold',
                            color: 'red',
                            }}>
                            {errorMessage}
                        </span>
                    }
                    {!connectMode &&
                    <div className={s.pwAdvise}>
                        Le mot de passe doit être de taille supérieur à 8, contenir une majuscule et un chiffre
                    </div>
                    }
                    </div>
                </div>
                <div className={s.el}>
                    <input  className={s.btn} type="submit" value="Valider"/>
                </div>
            </form>
        </div>
    )
}