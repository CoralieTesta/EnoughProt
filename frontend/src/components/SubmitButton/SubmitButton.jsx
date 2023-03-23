import s from "./style.module.css";

export function SubmitButton({text}) {
    return(
        <input  className={s.button} type="submit" value={text}/>
    )
}