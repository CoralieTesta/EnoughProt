import s from "./style.module.css"

export function InformationAboutProt() {
    return(
        <section className={s.container}>
                <h2>Quelle quantité de protéines avez-vous besoin ?</h2>
                <div className={s.info}>
                    Entre 10% et 35% des calories que vous consommez devraient venir de protéines.
                    L’apport alimentaire recommandé pour prévenir la carence chez un adulte moyen est de <span className={s.qtt}>0,8</span> gramme par kilogramme de poids corporel.
                </div>

                <div className={s.info}>
                    
                </div>
        </section>
    )
}