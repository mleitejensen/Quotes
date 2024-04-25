import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost"
import { useUserPosts } from "../hooks/useUserPosts";
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate } from 'react-router-dom'
import { useDeletePost } from "../hooks/useDeletePost";
import { useLike } from "../hooks/useLike";
import Like from "../assets/like.svg"
import Liked from "../assets/liked.svg"
import Modal from "../components/Modal"
import { useEditPost } from "../hooks/useEditPost";

const Home = () => {
    const { user } = useAuthContext()
    const { username } = useParams();
    const { like, likeIsLoading, likeError } = useLike()
    const { edit, editedPost, editIsLoading, editError } = useEditPost()

    if(user?.username !== username){
        return(
            <Navigate to={`/${username}`}/>
        )
    }


    const [origin, setOrigin] = useState("")
    const [body, setBody] = useState("")
    const {post, error, isLoading, data} = usePost()
    const {getUserPosts, userPostError, userPostIsLoading, userPostData} = useUserPosts()
    const {deletePost, deleteError, deleteIsLoading, deleteData} = useDeletePost()
    const [checkDelete, setCheckDelete] = useState(false)
    const [editing, setEditing] = useState(null)


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

    useEffect(() => {
        setEditing(null)
        getUserPosts(user.username)
    },[editedPost])

    const publish = async (e) => {
        e.preventDefault()

        await post(origin, body, user.username)
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
        {checkDelete && // modal for making sure you want to delete you post
            <Modal setCheckDelete={setCheckDelete} deletePost={deletePost} _id={checkDelete}></Modal>
        }

        {editing && 
            <form className="publish">
                <textarea 
                    cols={45} 
                    rows={4} 
                    maxLength="100" 
                    reset="true" 
                    value={editing?.body}
                    onChange={(e) => {setEditing(prev => ({...prev, body: e.target.value}))}}
                ></textarea> <br />
                <input type="text" placeholder="Origin of the quote" value={editing?.origin} onChange={(e) => {setEditing(prev => ({...prev, origin: e.target.value}))}}/><br />
                {error && <div className="error">{error}</div>}
                <div className="buttons">
                    <button disabled={isLoading} onClick={(e) => {e.preventDefault(); edit(editing?._id, editing?.body, editing?.origin)}}>Save edit</button>
                    <button onClick={(e) => {e.preventDefault(); setEditing(null)}}>Cancel edit</button>
                </div>
            </form>
        }

        {!editing &&
            <form className="publish">
                <textarea 
                    cols={45} 
                    rows={4} 
                    maxLength="100" 
                    placeholder="Input field for new quote here..." 
                    reset="true" 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea> <br />
                <input type="text" placeholder="Origin of the quote" value={origin} onChange={(e) => setOrigin(e.target.value)}/><br />
                {error && <div className="error">{error}</div>} 
                <button disabled={isLoading} onClick={publish}>Publish</button>
            </form>
        }


        {deleteError && 
            <div className="error">{deleteError}</div>
        }
       

        {userPostData && userPostData.map((post) => (
            <div className="post" key={post?._id}>
                <h3 className="quote tooltip edit" onClick={() => {setEditing(post); window.scrollTo({top: 0, left: 0, behavior: "smooth"})}}>"{post?.body}"<p className="tooltiptext">Click on this quote to edit it!</p></h3>
                <div className="box">
                    {user && 
                    <>

                        <div className="likes">
                        {!post?.likes.includes(user._id) && 
                            <img alt="Like button" className="like" disabled={likeIsLoading} onClick={() => {like(post?._id)}} src={Like}></img>
                        }
                        {post?.likes.includes(user._id) && 
                            <img alt="Like button" className="unlike" disabled={likeIsLoading} onClick={() => {like(post?._id)}} src={Liked}></img> 
                        }

                            <p>{post?.likes.length}</p>
                        </div>
                    </>
                    }
                    {!user &&
                        <p>Likes: {post?.likes.length}</p>
                    }
                    <p>Posted by: {post?.username} {getTimeAgo(post?.createdAt)}</p>
                    <p className="origin">- {post?.origin}</p>
                </div>
                
                
                <button className="delete" disabled={deleteIsLoading} onClick={() => setCheckDelete(post?._id)/*</div>deleteButton(post?._id)*/}>X</button>
            </div>
        ))}

        {userPostError && 
            <div className="error">{userPostError}</div>
        }

        { /*userPostIsLoading && 
            <div className="loading">Loading...</div>
        */}
        </>
    )
}

export default Home
