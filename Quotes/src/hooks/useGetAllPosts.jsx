import { useState } from "react"
import { json } from "react-router-dom"

const baseURL = process.env.PROXY

export const useGetAllPosts = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [posts, setPosts] = useState(null)

    const getPosts = async () => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${baseURL}/latest`);
        let data = await response.json();

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setPosts(data)
            setIsLoading(false)
        }

    }

    return { getPosts, posts, isLoading, error }

}