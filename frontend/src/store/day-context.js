import { createContext, useState } from "react";

const DayContext = createContext({
    dayArray: [],
    setDayArray: (dayArray) => {},
    isTodayInArray: () => {}
})

export function DayContextProvider({children}) {
    const [dayArray, setDayArray] = useState([])

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    function isTodayInArray() {
        if(dayArray.find(day => day.date === date)) {
            return true
        }
        return false
    }

    const context = {
        dayArray: dayArray,
        setDayArray: setDayArray,
        isTodayInArray: isTodayInArray,
    }
    return(
        <DayContext.Provider value={context} >
            {children}
        </DayContext.Provider>
    )
}

export default DayContext