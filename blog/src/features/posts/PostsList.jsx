//API URL comes from the .env.development file
import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";


function PostsList() {
    const [posts, setPosts] = useState([]);
    const [, setLoeading] = useState(true);
    const [, setError] = useState(null);
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

    return <div>
        {posts.map((post) => (
            <div key={post.id} className="post-container">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
        ))}
    </div>
}
export default PostsList;