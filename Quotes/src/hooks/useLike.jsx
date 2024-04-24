import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useLogout } from "./useLogout";

const baseURL = process.env.PROXY

export const useLike = () => {
    const [likeError, setError] = useState(null)
    const [likeIsLoading, setIsLoading] = useState(null)
    const [res, setRes] = useState(null)
    const {user} = useAuthContext()
    const {logout} = useLogout()

    const like = async (postID) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${baseURL}/like`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({postID})
        })
        const json = await response.json()

        if(!response.ok){
            if(response.status === 401){
                logout()
                alert("User session expired, you have been logged out.")
            }else{
                setError(json.error)
                setIsLoading(false)
            }
        }
        if(response.ok){
            setRes(json)
            setIsLoading(false)
        }
    }

    return { like, res, likeIsLoading, likeError }
}