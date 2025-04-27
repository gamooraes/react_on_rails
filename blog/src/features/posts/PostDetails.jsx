//Create the component PostDetails to show the details of a post
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../constants";


function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    // Fetch post from API
    useEffect(() => {
        async function loadPost() {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                if (response.ok) {
                    const json = await response.json();
                    setPost(json);
                    console.log(json);
                } else {
                    throw response;
                }
            } catch (e) {
                setError("An error occurred. Awkward...");
                console.log("Error: ", e);
            } finally {
                setLoading(false);
            }
        }
        loadPost();
    }, [id]);

    if (!post) return null;

    return (
        <div className="post-details">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to="/posts">Back to Posts List</Link>
            {" | "}
            <Link to={`/posts/edit/${post.id}`}>Edit Post</Link>
        </div>
    );
}
export default PostDetails;