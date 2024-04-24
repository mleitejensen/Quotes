import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useLogout } from "./useLogout";

const baseURL = process.env.PROXY

export const useEditPost = () => {
    const [editError, setError] = useState(null)
    const [editIsLoading, setIsLoading] = useState(null)
    const [editedPost, setEditedPost] = useState(null)
    const {user} = useAuthContext()
    const {logout} = useLogout()

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
            if(response.status === 401){
                logout()
                alert("User session expired, you have been logged out.")
            }else{
                setError(json.error)
                setIsLoading(false)
            }
        }
        if(response.ok){
            setEditedPost(json)
            setIsLoading(false)
        }
    }

    return { edit, editedPost, editIsLoading, editError }
}