import s from "./style.module.css"
import { BsTrash } from "react-icons/bs"
import { DayAPI } from "../../api/day-api"
import { useContext } from "react"
import UserContext from "../../store/user-context"
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export function FoodItem({name, quantity, quantityProtein,id,dayId,setFoodItemDeleted,date}) {
   const userCtx = useContext(UserContext)

    async function deleteHandler() {
        await DayAPI.removeFood(userCtx.token,id,dayId)
        
    }

    function deleteTrashHandler() {
        deleteHandler()
        setFoodItemDeleted(id)
        window.location.reload(false);
    }
    
    return(
        <Tr className={s.tr}>
            <Td className={s.td}>{name}</Td>
            <Td className={s.td}>{quantity}</Td>
            <Td className={s.td}>
                <div className={ s.miniContainer}>
                    <div className={s.qttProt}>{quantityProtein.toFixed(2)}</div>
                    <div className={s.trashIcon} 
                    onClick={(e) => {
                        e.stopPropagation()
                        const confirmBox = window.confirm(
                            "Voulez-vous vraiment supprimer cet aliment ?"
                        )
                        if (confirmBox === true) {
                            deleteTrashHandler()
                        }
                    }}
                    >
                        <BsTrash size={25} />
                    </div> 
                </div>
            </Td>
        </Tr>
    )
}