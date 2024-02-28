import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     if (!user) {
    //         axios.get('http://localhost:8000/api/user/profile')
    //             .then(({ data }) => {
    //                 setUser(data);
    //             })
    //     }
    // }, [user])

    useEffect(() => {
        if (!user) {
            axios.get('http://localhost:8000/api/user/profile', {
                withCredentials: true // Adding withCredentials flag
            })
                .then(({ data }) => {
                    setUser(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}