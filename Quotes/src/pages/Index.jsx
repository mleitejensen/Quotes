import { useEffect, useState } from "react"
import { useGetAllPosts } from "../hooks/useGetAllPosts"
import { useRandomPost } from "../hooks/useRandomPost"

const Index = () => {
    const { getRandomPost, post, isLoading, error } = useRandomPost()

    useEffect(() => {
        getRandomPost()
    }, [])

    return(
        <div className="index">
        <div className="randomPost">
            <h3 className="quote">"{post?.body}"</h3>
            <p>{post?.origin}</p>
        </div>

        {isLoading && <div className="loading">Loading</div>}

        {error && <div className="error">{error}</div>}
        
        </div>
    )
}

export default Index