//Create a new component EditPostForm to edit a post
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService";
import PostForm from "./PostForm";

function EditPostForm() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    // Fetch post from API
    useEffect(() => {
        async function loadPost() {
            try {
                const json = await fetchPost(id);
                setPost(json);
            } catch (error) {
                console.error("Failed to fetch a post. Awkward...", error);
            }
        }
        loadPost();
    }, [id]);

    async function handleUpdatePost(formdData) {
        try {
            const response = await updatePost(id, formdData);
            navigate(`/posts/${response.id}`);
        } catch (error) {
            console.error("Failed to update a post: ", error);
        }
    }

    if (!post) return <h2>Loading...</h2>;

    return (
        <PostForm
            post={post}
            headerText="Edit Post"
            buttonText="Update Post"
            onSubmit={handleUpdatePost}
        ></PostForm>
    );

}
export default EditPostForm;
