import s from "./style.module.css"
import { FoodItem } from "../FoodItem/FoodItem"
import { useNavigate } from "react-router-dom"
import { useContext, useState} from "react"
import UserContext from "../../store/user-context"
import { DayAPI } from "../../api/day-api"
import { BsTrash } from "react-icons/bs";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export function DayItem({id,date, food, details, setIsDayDeleted, setFoodItemDeleted}) {
    const navigate = useNavigate()
    const userCtx = useContext(UserContext)
    const [isHovered,setIsHovered] = useState(false)

    const total = food.reduce((accumulator, currentValue) =>{
        if(currentValue.quantityProtein)
            {
            return(
            accumulator + (currentValue.quantityProtein)/1)
        }
        else {
            return(accumulator)
        }
    },0)

    const totalProt =parseFloat(total).toFixed(2)

    function onShowSpecificDay() {
        if(!details) {
        const link='/day/'+date
        navigate(link)
        }
    }

    async function deleteHandler() {
        await DayAPI.deleteDay(userCtx.token, id)
        setIsDayDeleted(id)
    }

    function toggleHover() {
        setIsHovered(!isHovered)
    }

    return(
        <div 
            className={s.container} 
            onClick={onShowSpecificDay}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            style={{
                cursor : details? "auto" : "pointer",
                backgroundColor: !details && isHovered ? "rgb(216, 199, 227)" : "rgb(217, 209, 222)"
            }}
        >
            
            <div className={s.titleContainer}>
                <h2 className={s.title}>{date}</h2>

                {!details &&
                    <div 
                        className={s.deleteBtn}
                        onClick={(e) => {
                            e.stopPropagation()
                            const confirmBox = window.confirm(
                                "Voulez-vous vraiment supprimer cette journée ?"
                            )
                            if (confirmBox === true) {
                                deleteHandler()
                            }
                        }}
                    >
                        <BsTrash size={25} className={s.trashIcon} />
                    </div>
                }
            </div>
            {details &&
                <Table>
                    <Thead> 
                        <Tr>
                            <Th className={s.th}>Aliment</Th>
                            <Th className={s.th}>Quantité</Th>
                            <Th className={s.th}>Protéines (g)</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {food.map((item) => 
                            <FoodItem
                                key={item._id}
                                id={item._id}
                                dayId={id}
                                name={item.name}
                                quantity={item.quantity}
                                quantityProtein={item.quantityProtein}
                                setFoodItemDeleted={setFoodItemDeleted}
                                date={date}
                            />
                        )}
                    </Tbody>
                </Table> 
            }
                {userCtx.qttProtPerDay?
                    (
                        userCtx.qttProtPerDay > total ?
                            (<div className={s.total} style={{backgroundColor:" rgb(169, 16, 16)"}}>Quantité total de protéines: {total}g</div>)
                            :
                            (<div className={s.total} style={{backgroundColor: "rgb(2, 90, 2)"}}>Quantité total de protéines: {total}g</div>)
                    )
                    :
                    (<div className={s.total}>Quantité totale de protéines: {totalProt}g</div>)
                }
        </div>
    )
}