//Create a component for new posts in the app
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";

function NewPostForm() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle form submission
    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        const postData = { title, body };
        try {
            const response = await createPost(postData);
            navigate(`/posts/${response.id}`);
        } catch (e) {
            setError("An error occurred. Awkward...");
            console.log("Error: ", e);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="new-post-form">
            <h2>Create a New Post</h2>
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
                    ></textarea>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Post"}
                </button>
            </form>
        </div>
    );
}
export default NewPostForm;
