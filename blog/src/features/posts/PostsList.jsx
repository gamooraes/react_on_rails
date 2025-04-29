//API URL comes from the .env.development file
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchAllPosts, deletePost as deletePostService } from "../../services/postService";

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [, setLoeading] = useState(true);
    const [, setError] = useState(null);
    const navigate = useNavigate();
    // Fetch posts from API
    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await fetchAllPosts();
                setPosts(data);
                setLoeading(false);
            } catch (e) {
                console.error("Failed to fetch a post. Awkward...", e);
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
            await deletePostService(id);
            setPosts(posts.filter((post) => post.id !== id));
            navigate("/");
        } catch (e) {
            console.error("An error occurred. Awkward...", e);
        } finally {
            setLoeading(false);
        }
    }

    if (!posts || posts.length === 0) return null;
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