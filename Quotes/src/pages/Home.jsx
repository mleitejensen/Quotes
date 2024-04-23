import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost"
import { useUserPosts } from "../hooks/useUserPosts";
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate } from 'react-router-dom'
import { useDeletePost } from "../hooks/useDeletePost";
import { useLike } from "../hooks/useLike";

const Home = () => {
    const { user } = useAuthContext()
    const { username } = useParams();
    const { like, likeIsLoading, likeError } = useLike()

    if(user.username !== username){
        return(
            <Navigate to="/"/>
        )
    }


    const [origin, setOrigin] = useState("")
    const [body, setBody] = useState("")
    const {post, error, isLoading, data} = usePost()

    const {getUserPosts, userPostError, userPostIsLoading, userPostData} = useUserPosts()

    const {deletePost, deleteError, deleteIsLoading, deleteData} = useDeletePost()


    useEffect(() => {
        getUserPosts(user.username)
    },[likeIsLoading])

    useEffect(() => {
        getUserPosts(user.username)
    }, [username])

    useEffect(() => {
        getUserPosts(user.username)
        setBody("")
        setOrigin("")
    },[data])

    useEffect(() => {
        getUserPosts(user.username)
    },[deleteData])

    const publish = async (e) => {
        e.preventDefault()

        await post(origin, body, user.username)
    }

    const deleteButton = (_id) => {
        deletePost(_id)
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
        <>

        <form className="publish">
            <textarea 
                cols={45} 
                rows={4} 
                maxLength="100" 
                placeholder="Input field for quote here..." 
                reset="true" 
                value={body}
                onChange={(e) => setBody(e.target.value)}
            ></textarea> <br />
            <input type="text" placeholder="Origin of the quote" value={origin} onChange={(e) => setOrigin(e.target.value)}/><br />
            {error && <div className="error">{error}</div>} 
            <button disabled={isLoading} onClick={publish}>Publish</button>

        </form>

        {deleteError && 
            <div className="error">{deleteError}</div>
        }
       

        {userPostData && userPostData.map((post) => (
            <div className="post" key={post?._id}>
                <h3 className="quote">"{post?.body}"</h3>
                <div className="box">
                    <p>Likes: {post?.likes.length}</p>
                    <p>{getTimeAgo(post.createdAt)}</p>
                    <p>{post?.origin}</p>

                </div>
                {post?.likes?.includes(user._id) && 
                <button className="unlike" disabled={likeIsLoading} onClick={() => {like(post?._id)}}>Unlike</button>
                }
                {!post?.likes?.includes(user._id) && 
                <button className="like" disabled={likeIsLoading} onClick={() => {like(post?._id)}}>Like</button>
                }
                <button className="delete" disabled={deleteIsLoading} onClick={() => deleteButton(post?._id)}>X</button>
            </div>
        ))}

        {userPostError && 
            <div className="error">{userPostError}</div>
        }

        {userPostIsLoading && 
            <div className="loading">Loading...</div>
        }
        </>
    )
}

export default Home
