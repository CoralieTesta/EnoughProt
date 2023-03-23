import s from "./style.module.css"
import { BsBucket, BsFillFileEarmarkPlusFill } from "react-icons/bs"

export function AddButton({onClickHandler, text, icon}) {
    return(
        <div className={s.addContainer}>
            <button className={s.button} onClick={onClickHandler}>
                {icon==="bucket" ?
                    (<div className={s.plusIcon}><BsBucket size={25}/></div>)
                    :
                    (<div className={s.plusIcon}><BsFillFileEarmarkPlusFill size={25}/></div>)
                } 
                
                <div>{text}</div>
            </button>
        </div>
    )
}