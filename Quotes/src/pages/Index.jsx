import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useRandomPost } from "../hooks/useRandomPost"
import Like from "../assets/like.svg"
import Liked from "../assets/liked.svg"
import { useLike } from "../hooks/useLike"
import { useAuthContext } from "../hooks/useAuthContext"

const Index = (userProfile) => {
    const { getRandomPost, post, isLoading, error } = useRandomPost()
    const { like, res, likeIsLoading, likeError } = useLike()
    const { user } = useAuthContext()



    useEffect(() => {
        console.log(userProfile)
        getRandomPost()
    }, [])
   
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
                <>

                {!user &&
                <>
                    <div className="likes">
                        <Link className="likeLink" to="/sign-up">
                            <img alt="Like button" className="like" src={Like}></img>
                        </Link>
                        <p>{post?.likes.length}</p>
                    </div>
                    <p>Posted by: {post?.username} {getTimeAgo(post?.createdAt)}</p>
                    <p className="origin">{post?.origin}</p>
                </>
                }

                {user &&
                <>
                    {!res &&
                    <>
                        {post?.likes?.includes(user?._id) && 
                        <>
                            <div className="likes">
                                <img alt="Like button" className="unlike" disabled={likeIsLoading} onClick={() => {like(post?._id)}} src={Liked}></img> 
                                <p>{post?.likes.length}</p>
                            </div>
                            <p>Posted by: {post?.username} {getTimeAgo(post?.createdAt)}</p>
                            <p className="origin">- {post?.origin}</p>
                        </>
                        }
                        {!post?.likes?.includes(user?._id) && 
                        <>
                            <div className="likes">
                                <img alt="Like button" className="like" disabled={likeIsLoading} onClick={() => {like(post?._id)}} src={Like}></img>
                                <p>{post?.likes.length}</p>
                            </div>
                            <p>Posted by: {post?.username} {getTimeAgo(post?.createdAt)}</p>
                            <p className="origin">- {post?.origin}</p>
                        </>
                        }
                    </>
                    }
                    {res &&
                    <>
                        {res?.likes?.includes(user?._id) && 
                        <>
                            <div className="likes">
                                <img alt="Like button" className="unlike" disabled={likeIsLoading} onClick={() => {like(res?._id)}} src={Liked}></img> 
                                <p>{res?.likes.length}</p>
                            </div>
                            <p>Posted by: {res?.username} {getTimeAgo(post?.createdAt)}</p>
                            <p className="origin">- {res?.origin}</p>
                        </>
                        }
                        {!res?.likes?.includes(user?._id) && 
                        <>
                            <div className="likes">
                                <img alt="Like button" className="like" disabled={likeIsLoading} onClick={() => {like(res?._id)}} src={Like}></img>
                                <p>{res?.likes.length}</p>
                            </div>
                            <p>Posted by: {res?.username} {getTimeAgo(res?.createdAt)}</p>
                            <p className="origin">- {res?.origin}</p>
                        </>
                        }
                    </>
                    }
                
                </>
                }

                
                </>
            </div>
        </div>

        {isLoading && <div className="loading">Loading</div>}

        {error && <div className="error">{error}</div>}
        
        </div>
    )
}

export default Index