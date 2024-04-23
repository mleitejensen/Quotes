import { useEffect, useState } from "react"
import { useGetAllPosts } from "../hooks/useGetAllPosts"
import { useDeletePost } from "../hooks/useDeletePost";
import { useAuthContext } from "../hooks/useAuthContext";

const Testing = () => {
    const { user } = useAuthContext()
    const { getPosts, posts, isLoading, error } = useGetAllPosts()
    const {deletePost, deleteError, deleteIsLoading, deleteData} = useDeletePost()

    const [currentDelete, setCurrentDelete] = useState(null)
    const [userError, setUserError] = useState(null)

    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        getPosts()
    }, [deleteData])

    const deleteButton = (_id) => {
        setUserError(null)
        setCurrentDelete(_id)
        if(!user){
            return setUserError("You are not logged in")
        }

        deletePost(_id)
    }    

    return(
        <> 

        {posts && posts.map((post) => (
            <div className="post" key={post?._id}>
                <h3>{post?.title}</h3>
                <p>{post?.body}</p>
                <button className="delete" disabled={deleteIsLoading} onClick={() => deleteButton(post?._id)}>Delete</button>
                {currentDelete == post?._id &&
                <>
                    {deleteError && <div className="error">{deleteError}</div>}
                    {userError && <div className="error">{userError}</div>}
                </>
                }
            </div>
        ))}

        {isLoading && <div className="loading">Loading</div>}

        {error && <div className="error">{error}</div>}
        
        </>
    )
}

export default Testing