//API URL comes from the .env.development file
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";


function PostsList() {
    const [posts, setPosts] = useState([]);
    const [, setLoeading] = useState(true);
    const [, setError] = useState(null);
    const navigate = useNavigate();
    // Fetch posts from API
    useEffect(() => {
        async function loadPosts(params) {
            try {
                const response = await fetch(`${API_URL}`);
                if (response.ok) {
                    const json = await response.json();
                    setPosts(json);
                }
                else {
                    throw response;
                }
            } catch (e) {
                setError("An error ocurred. Awkward...")
                console.log("Error: ", e);
            } finally {
                setLoeading(false);
            }
        }
        loadPosts();
    }, [])
    // Delete post
    async function deletePost(id) {
        setLoeading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setPosts(posts.filter((post) => post.id !== id));
                navigate(`/`);
            } else {
                throw response;
            }
        } catch (e) {
            setError("An error occurred. Awkward...");
            console.log("Error: ", e);
        } finally {
            setLoeading(false);
        }
    }
    if (!posts) return null;
    return <div>
        {posts.map((post) => (
            <div key={post.id} className="post-container">
                <h2>
                    <Link to={`posts/${post.id}`} className="post-title">
                        {post.title}
                    </Link>
                </h2>
                <div className="post-links">
                    <Link to={`/posts/${post.id}`} className="post-link">
                        View
                    </Link>
                    {" | "}
                    <Link to={`/posts/edit/${post.id}`} className="post-link">
                        Edit
                    </Link>
                    {" | "}
                    <button onClick={() => deletePost(post.id)} className="post-link">
                        Delete
                    </button>
                </div>
            </div>
        ))}
    </div>
}
export default PostsList;