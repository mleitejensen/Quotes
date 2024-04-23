import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const baseURL = process.env.PROXY

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (username, password, passwordCheck) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${baseURL}/signup`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password, passwordCheck})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem("user", JSON.stringify(json))

            dispatch({type: "LOGIN", payload: json})

            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
    

}