import { useState } from "react"

const baseURL = process.env.PROXY

export const useRandomPost = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [post, setPosts] = useState(null)

    const getRandomPost = async () => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${baseURL}/random`);
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

    return { getRandomPost, post, isLoading, error }

}