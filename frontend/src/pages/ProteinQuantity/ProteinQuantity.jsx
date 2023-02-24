import { CalculateSection } from "../../components/CalculateSection/CalculateSection";
import { InformationAboutProt } from "../../components/InformationAboutProt/InformationAboutProt";

export function ProteinQuantity() {
    return(
        <div>
            <h1 style={{textAlign: 'center'}}>Quantité de protéines journalière</h1>
            <InformationAboutProt />
            
            <CalculateSection />
        </div>
    )
}