import { createContext, useContext, useState, useEffect, } from "react";

const apiContext = createContext();

export const Apiprovider = ({children}) => {
    const [lLoading, setLoading] = useState(false)
    const [user, setuser] = useState(null)



    //to register use /api/auth/sign_up method post
    const Registration = async (userInfo) => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/sign_up", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(userInfo)
            })

            const data = await res.json();
            if (res.ok) {
                setLoading(false);
                return data
            } else {
                console.error("Registertion failed :", data.message);
                setLoading(false);
                throw new Error(data.message || "Registration failed")
            }
        } catch (error) {
            console.log("network Error")
            setLoading(false)
            throw error;
        }
    }

    //to sign in use /api/auth/sign_in method post
    const login = async ( credentails) => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/sign_up", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(credentails)
            })

            const data = await res.json();
            if (res.ok) {
                setLoading(false);
                setuser(data.data)
                sessionStorage.setItem("user",JSON.stringify(data.data))
                return data
            } else {
                console.error("sign in failed :", data.message);
                setLoading(false);
                throw new Error(data.message || "sign in failed")
            }
        } catch (error) {
            console.log("network Error")
            setLoading(false)
            throw error;
        }
    }


    const value = {
        Registration,
        login
    }
    return (
        <apiContext.Provider value={value}>
            {children}
        </apiContext.Provider>
    )
}
export const useApi = () => {
    const Contex = useContext(apiContext);

    if (!Contex) {
        throw new Error("use api must be used within an apiprovider");

    }
    return Contex;

}