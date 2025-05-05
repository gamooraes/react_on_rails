//Create a component for new posts in the app
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import PostForm from "./PostForm";

function NewPostForm() {
    const navigate = useNavigate();
    // Handle form submission
    const handleNewPost = async (rawData) => {
        // Create a new FormData object
        const formData = new FormData();
        // Append the data to the FormData object
        formData.append("post[title]", rawData.title);
        formData.append("post[body]", rawData.body);
        formData.append("post[image]", rawData.image);
        try {
            const response = await createPost(formData);
            navigate(`/posts/${response.id}`);
        } catch (error) {
            console.error("An error occurred. Awkward...", error);
        };

    };

    return (
        < PostForm
            headerText="Create a New Post"
            buttonText="Create Post"
            onSubmit={handleNewPost}
        ></PostForm >
    );
};
export default NewPostForm;
