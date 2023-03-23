import {TbError404} from "react-icons/tb";
import s from "./style.module.css"

export function NotFound() {
    return(
        <div className={s.container}>
            <div className={s.text}>
                <div>
                    OOPS: <span className={s.pageNotFound}>PAGE NOT FOUND</span>
                </div>
                <div>
                    <TbError404 size={80} /> 
                </div>
                <div>
                    WE ARE SORRY, BUT THE PAGE YOU REQUEST WAS NOT FOUND
                </div>
            </div>
        </div>
    )
}