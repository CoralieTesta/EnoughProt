import { useContext, useRef, useState } from "react"
import UserContext from "../../store/user-context"
import { LoginAdvice } from "../LoginAdvice/LoginAdvice"
import { SubmitButton } from "../SubmitButton/SubmitButton"
import s from "./style.module.css"

export function WeightForm() {
    const [weight,setWeight] =useState()
    const weightInputRef = useRef()
    const userCtx = useContext(UserContext)

    function submitHandler(e) {
        e.preventDefault()
        const enteredWeight = weightInputRef.current.value
        setWeight(enteredWeight)
        const quantityProtein =enteredWeight*0.8
        userCtx.setQttProtPerDay(quantityProtein)
        localStorage.setItem('quantityProtein-info', JSON.stringify(quantityProtein));
    }

    return(
        <>
            {userCtx.email ?
                (    
                <div className={s.container}>
                    <form onSubmit={submitHandler}>
                        <label className={s.label} htmlFor="weight">Poids (kilos): </label>
                        <input 
                            type="weight" 
                            id="weight"
                            name="weight"
                            autoFocus
                            ref={weightInputRef}
                            placeholder="70"
                            className={s.input}
                        />
                        kg

                        <SubmitButton text="Valider" />
                    </form>

                    {weight &&
                    <div className={s.results}>
                    Vous devez consommer {weight*0.8}g de protéines chaque jour.
                    </div>
                    
                    }
                </div>
                )
                :
                (
                    <LoginAdvice />
                )
            }
        </>
    )
}