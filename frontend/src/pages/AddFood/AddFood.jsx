
import { useContext } from "react";
import UserContext from "../../store/user-context";
import { Food } from "../Food/Food";

export function AddFood() {
    const userCtx = useContext(UserContext)
    
    return(
        <>
            {userCtx.email ?
                (<>
                    <Food title="Ajoutez un aliment" option="Option 1 : Utilisez nos données" customized={false}/>
                    <Food title=" " option="Option 2 : Ajoutez un aliment personnalisé" customized={true}/>
                </>
                )
                :
                (<Food title="Ajoutez un aliment" customized={false}/>)
            }
        </>
    )
}