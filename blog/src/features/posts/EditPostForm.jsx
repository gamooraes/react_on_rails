//Create a new component EditPostForm to edit a post
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService";

function EditPostForm() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch post from API
    useEffect(() => {
        async function loadPost() {
            try {
                const json = await fetchPost(id);
                setPost(json);
                setLoading(false);
            } catch (e) {
                setError("An error occurred. Awkward...");
                console.log("Error: ", e);
            }
        }
        loadPost();
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();
        const updatedPost = {
            title: post.title,
            body: post.body,
        };
        try {
            const response = await updatePost(id, updatedPost);
            navigate(`/posts/${response.id}`);
        } catch (e) {
            setError("An error occurred. Awkward...");
            console.log("Error: ", e);
        }
    }

    if (!post) return <h2>Loading...</h2>;

    return (
        <div className="edit-post-form">
            <h2>Edit Post</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={post?.title || ""}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        value={post?.body || ""}
                        onChange={(e) => setPost({ ...post, body: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );

}
export default EditPostForm;
