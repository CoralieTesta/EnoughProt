import s from "./style.module.css"

export function InEnglish() {
    return(
        <div className={s.container}>
            Complétez ce formulaire <span className={s.english}>en anglais</span>.
        </div>
    )
}