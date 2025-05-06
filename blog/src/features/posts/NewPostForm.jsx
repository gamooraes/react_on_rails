//Create a component for new posts in the app
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import PostForm from "./PostForm";
import { objectToFormData } from "../../utils/formDataHelper";

function NewPostForm() {
    const navigate = useNavigate();
    // Handle form submission
    const handleNewPost = async (rawData) => {
        try {
            const formData = objectToFormData({ post: rawData });
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
