//Create a new component EditPostForm to edit a post
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPost, editPost } from "../../services/postService";

function EditPostForm() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch post from API
    useEffect(() => {
        async function loadPost() {
            try {
                const json = await fetchPost(id);
                setTitle(json.title);
                setBody(json.body);
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
        setLoading(true);
        setError(null);
        const postData = { title, body };
        try {
            await editPost(id, postData);
            navigate(`/posts/${id}`);
        } catch (e) {
            setError("An error occurred. Awkward...");
            console.log("Error: ", e);
        } finally {
            setLoading(false);
        }
    }

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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
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
