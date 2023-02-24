import { createContext, useState } from "react";

const UserContext = createContext({
    email:"",
    setEmail: (email) => {},
    token:"",
    setToken: (token) => {},
    qttProtPerDay: 0,
    setQttProtPerDay: (qtt) => {},
    isLogIn:false,
    setIsLogIn: (isLogIn) => {}
})

export function UserContextProvider({children}) {
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")
    const [qttProtPerDay, setQttProtPerDay]=useState()
    const [isLogIn, setIsLogIn] = useState(false)

    const context = {
        email: email,
        setEmail: setEmail,
        token: token,
        setToken: setToken,
        qttProtPerDay: qttProtPerDay,
        setQttProtPerDay: setQttProtPerDay,
        isLogIn: isLogIn,
        setIsLogIn: setIsLogIn
    }
    return(
        <UserContext.Provider value={context} >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext