import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useLogout } from "./useLogout"


const baseURL = process.env.PROXY

export const useDeletePost = () => {
    const [deleteError, setDeleteError] = useState(null)
    const [deleteIsLoading, setDeleteIsLoading] = useState(null)
    const [deleteData, setDeleteData] = useState(null)
    const {user} = useAuthContext()
    const {logout} = useLogout()
    

    const deletePost = async (postID) => {
        setDeleteError(null)
        setDeleteIsLoading(true)

        if(!user.token){
            return setDeleteError("you must be logged in")
        }

        const response = await fetch(`${baseURL}/delete`, {
            method: "DELETE",
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
                setDeleteError(json.error)
            }
            setDeleteIsLoading(false)
        }
        if(response.ok){
            setDeleteData(json)
            setDeleteIsLoading(false)
        }
    }

    return {deletePost, deleteError, deleteIsLoading, deleteData}
}