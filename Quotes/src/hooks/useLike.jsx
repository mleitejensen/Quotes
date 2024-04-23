import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const baseURL = process.env.PROXY

export const useLike = () => {
    const [likeError, setError] = useState(null)
    const [likeIsLoading, setIsLoading] = useState(null)
    const {user} = useAuthContext()

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
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setIsLoading(false)
        }
    }

    return { like, likeIsLoading, likeError }
}