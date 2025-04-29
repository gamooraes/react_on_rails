//Create the component PostDetails to show the details of a post
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deletePost as deletePostService, fetchPost } from "../../services/postService";

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch post from API
    useEffect(() => {
        async function loadPost() {
            try {
                const json = await fetchPost(id);
                setPost(json);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch a post. Awkward...", error);
            }
        }
        loadPost();
    }, [id]);

    const deletePost = async () => {
        setLoading(true);
        setError(null);
        try {
            await deletePostService(id);
        } catch (error) {
            console.error("An error occurred. Awkward...", error);
        } finally {
            setLoading(false);
            navigate("/");
        }
    }
    if (!post) return null;

    return (
        <div className="post-details">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to="/">Back to Posts List</Link>
            {" | "}
            <Link to={`/posts/edit/${post.id}`}>Edit Post</Link>
            {" | "}
            <button onClick={() => deletePost(post.id)} className="post-link">
                Delete
            </button>
        </div>
    );
}
export default PostDetails;