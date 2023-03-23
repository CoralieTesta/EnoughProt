import { useRef } from "react"
import s from "./style.module.css"
export function FoodForm({onSearch, setQuantity, setFood, setQuantityProtein, customized}) {
    const quantityInputRef = useRef()
    const foodInputRef = useRef()
    const quantityProteinInputRef=useRef()

    function submitHandler(e) {
        e.preventDefault()
        const enteredQuantity = quantityInputRef.current.value
        const enteredFood = foodInputRef.current.value
        if(customized) {
            const enteredQuantityProtein = quantityProteinInputRef.current.value
            setQuantityProtein(enteredQuantityProtein)
        }
        setQuantity(enteredQuantity)
        setFood(enteredFood)
    }

    return(
        <div className={s.container}>
            <h3 className={s.title}>Quantité de protéines pour</h3>
            <form onSubmit={submitHandler}>
                <div className={s.el}>
                    <label className={s.label} htmlFor="quantity">Quantité: </label>
                    {customized ?
                        (<input 
                            type="quantity" 
                            id="quantity"
                            name="quantity"
                            ref={quantityInputRef}
                            placeholder="100g"
                        />)
                        :
                        (<input 
                            type="quantity" 
                            id="quantity"
                            name="quantity"
                            ref={quantityInputRef}
                            autoFocus
                            placeholder="100g"
                        />)
                    }
                </div>
                <div className={s.el}>
                    <label className={s.label} htmlFor="food">Aliment: </label>
                    <input
                        type="food"
                        id="food"
                        name="food"
                        ref={foodInputRef}
                        placeholder="nuts"
                    />
                </div>
                {customized &&    
                    <div className={s.el}>
                        <label className={s.label} htmlFor="quantityProtein">Quantité de protéines pour 100g: </label>
                        <input
                            type="quantityProtein"
                            id="quantityProtein"
                            name="quantityProtein"
                            ref={quantityProteinInputRef}
                            placeholder="17.3"
                        />
                        g
                    </div>}
                <div className={s.el}>
                    <input  className={s.btn} type="submit" value="Valider"/>
                </div>
            </form>
        </div>
    )
}