import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserPosts } from "../hooks/useUserPosts"
import Like from "../assets/like.svg"
import Liked from "../assets/liked.svg"
import { useLike } from "../hooks/useLike";
import { useAuthContext } from "../hooks/useAuthContext";

const User = () => {
    const { user } = useAuthContext()
    const { username } = useParams();
    const {getUserPosts, userPostError, userPostIsLoading, userPostData} = useUserPosts()
    const { like, likeIsLoading, likeError } = useLike()


    useEffect(() => {
        getUserPosts(username)
    }, [username])

    useEffect(() => {
        getUserPosts(username)
    },[likeIsLoading])

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
        <>
        <h1>{username}'s posts</h1>

        {userPostData && userPostData.map((post) => (
            <div className="post" key={post._id}>
                <h3 className="quote">"{post?.body}"</h3>
                <div className="box">
                    {user && 
                    <>
                        {post?.likes?.includes(user._id) && 
                        <div className="likes">
                            <img className="unlike" disabled={likeIsLoading} onClick={() => {like(post?._id)}} src={Liked}></img> 
                            <p>{post?.likes.length}</p>
                        </div>
                        }
                        {!post?.likes?.includes(user._id) && 
                        <div className="likes">
                            <img className="like" disabled={likeIsLoading} onClick={() => {like(post?._id)}} src={Like}></img>
                            <p>{post?.likes.length}</p>
                        </div>
                        }
                    </>
                    }
                    {!user &&
                        <p>Likes: {post?.likes.length}</p>
                    }
                    <p>{getTimeAgo(post?.createdAt)}</p>
                    <p>{post?.origin}</p>
                </div>
            </div>

        ))}

        {userPostIsLoading && <div className="loading">Loading...</div>}

        {userPostError && 
            <div className="error">{userPostError}</div>
        }

        </>
    )
}

export default User