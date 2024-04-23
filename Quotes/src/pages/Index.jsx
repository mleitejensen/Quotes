import { useEffect, useState } from "react"
import { useRandomPost } from "../hooks/useRandomPost"
import Like from "../assets/like.svg"
import Liked from "../assets/liked.svg"
import { useLike } from "../hooks/useLike"
import { useAuthContext } from "../hooks/useAuthContext"

const Index = () => {
    const { getRandomPost, post, isLoading, error } = useRandomPost()
    const { like, likeIsLoading, likeError } = useLike()
    const { user } = useAuthContext()
    const [updatedPost, setUpdatedPost] = useState()

    const baseURL = process.env.PROXY

    useEffect(() => {
        getRandomPost()
    }, [])


    const getUpdatedPostData = async (id) => {
        const response = await fetch(`${baseURL}/post/${id}`)
        const res = await response.json()
        if(response.ok){
            setUpdatedPost(res)
        }
    }

    const getTimeAgo = (timestamp) => {
        const previousDate = new Date(timestamp)
        const currentDate = new Date()

        const timeDifference = currentDate - previousDate
        const seconds = Math.floor(timeDifference / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        if(days > 0){
            return days === 1 ? "1 day ago" : `${days} days ago`
        } else if(hours > 0){
            return hours === 1 ? "1 hour ago" : `${hours} hours ago`
        } else if(minutes > 0){
            return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`
        } else if(seconds > 0){
            return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`
        }
    }

    return(
        <div className="index">
        <div className="randomPost">
            <h3 className="quote">"{post?.body}"</h3>
            <div className="box">
                {updatedPost &&
                <>
                    {updatedPost?.likes.includes(user._id) && 
                    <>
                        <div className="likes">
                            <img className="unlike" disabled={likeIsLoading} onClick={() => {like(updatedPost?._id); getUpdatedPostData(updatedPost?._id)}} src={Liked}></img> 
                            <p>{updatedPost?.likes.length}</p>
                        </div>
                        <p>Posted by: {updatedPost?.username} {getTimeAgo(updatedPost?.createdAt)}</p>
                        <p>{updatedPost?.origin}</p>
                    </>
                    }
                    {!updatedPost?.likes.includes(user._id) && 
                    <>
                        <div className="likes">
                            <img className="like" disabled={likeIsLoading} onClick={() => {like(updatedPost?._id); getUpdatedPostData(updatedPost?._id)}} src={Like}></img>
                            <p>{updatedPost?.likes.length}</p>
                        </div>
                        <p>Posted by: {updatedPost?.username} {getTimeAgo(updatedPost?.createdAt)}</p>
                        <p>{updatedPost?.origin}</p>
                    </>
                    }
                </>
                }
                {!updatedPost &&
                <>
                    {user && 
                    <>
                        {post?.likes?.includes(user._id) && 
                        <>
                            <div className="likes">
                                <img className="unlike" disabled={likeIsLoading} onClick={() => {like(post?._id); getUpdatedPostData(post?._id)}} src={Liked}></img> 
                                <p>{post?.likes.length}</p>
                            </div>
                            <p>Posted by: {post?.username} {getTimeAgo(post?.createdAt)}</p>
                            <p>{post?.origin}</p>
                        </>
                        }
                        {!post?.likes?.includes(user._id) && 
                        <>
                            <div className="likes">
                                <img className="like" disabled={likeIsLoading} onClick={() => {like(post?._id); getUpdatedPostData(post?._id)}} src={Like}></img>
                                <p>{post?.likes.length}</p>
                            </div>
                            <p>Posted by: {post?.username} {getTimeAgo(post?.createdAt)}</p>
                            <p>{post?.origin}</p>
                        </>
                        }
                    </>
                    }
                    {!user &&
                    <>
                        <p>Likes: {post?.likes.length}</p>
                        <p>Posted by: {post?.username} {getTimeAgo(post?.createdAt)}</p>
                        <p>{post?.origin}</p>
                    </>
                    }
                </>
                }
                
            </div>
        </div>

        {isLoading && <div className="loading">Loading</div>}

        {error && <div className="error">{error}</div>}
        
        </div>
    )
}

export default Index