import { useEffect, useState } from "react";
import { FoodAPI } from "../../api/food-api";
import { FoodForm } from "../../components/FoodForm/FoodForm";
import { FoodResults } from "../../components/FoodResults/FoodResults";
import { InEnglish } from "../../components/InEnglish/InEnglish";

export function Food({title, option, customized}) {
    const [quantity, setQuantity]= useState("100g")
    const [food, setFood] = useState("nuts")
    const [quantityProtein,setQuantityProtein]=useState(17.3)

    async function getProt(quantity, food){
        if(!customized) {
            const response = await FoodAPI.getProtein(quantity, food)
            if(response.data.totalNutrients.PROCNT){
                setQuantityProtein(response.data.totalNutrients.PROCNT.quantity)
            }
            else {
                setQuantityProtein(false)
            }
        }
    }
    
    useEffect(() => {
        getProt(quantity, food)
    }, [quantity, food])

    return(
        <>
            {title?
                (<h1 style={{textAlign: 'center'}}>{title}</h1>)
                :
                (<h1 style={{textAlign: 'center'}}>Informations nutritionnelles</h1>)
            }
            {option &&
                <h2 style={{
                    marginLeft : 30, 
                    marginTop : 30, 
                    color: 'white', 
                    backgroundColor : "Indigo",
                    padding: 5
                }}>{option}</h2>
            }
            {!customized &&
                <InEnglish />
            }
            <FoodForm setQuantity={setQuantity} setFood={setFood} setQuantityProtein={setQuantityProtein} customized={customized} />
            <FoodResults 
                quantity={quantity} 
                food={food} 
                quantityProtein={quantityProtein} 
                customized={customized}
            />
        </>
    )
}