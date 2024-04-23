import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserPosts } from "../hooks/useUserPosts"

const User = () => {
    const { user } = useParams();
    const {getUserPosts, userPostError, userPostIsLoading, userPostData} = useUserPosts()

    useEffect(() => {
        getUserPosts(user)
    }, [user])

    return(
        <>
        <h1>{user}'s posts</h1>

        {userPostData && userPostData.map((post) => (
            <div className="post" key={post._id}>
                <h3 className="quote">"{post?.body}"</h3>
                <p>{post?.origin}</p>
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