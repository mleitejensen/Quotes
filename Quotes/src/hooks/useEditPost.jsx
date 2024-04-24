import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const baseURL = process.env.PROXY

export const useEditPost = () => {
    const [editError, setError] = useState(null)
    const [editIsLoading, setIsLoading] = useState(null)
    const [editedPost, setEditedPost] = useState(null)
    const {user} = useAuthContext()

    const edit = async (postID, newBody, newOrigin) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${baseURL}/edit`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({postID, newBody, newOrigin})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setEditedPost(json)
            setIsLoading(false)
        }
    }

    return { edit, editedPost, editIsLoading, editError }
}