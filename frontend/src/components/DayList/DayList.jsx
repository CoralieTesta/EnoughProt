import { DayItem } from "../DayItem/DayItem";


export function DayList({dayArray, details,setIsDayDeleted}) {
    return(
        <div>
            <ul>
                {dayArray.slice(0).reverse().map((day) =>
                    <DayItem
                        key={day._id}
                        id={day._id}
                        date={day.date}
                        food={day.food}
                        details={details}
                        setIsDayDeleted={setIsDayDeleted}
                    />
                )}
            </ul>
        </div>
    )
}