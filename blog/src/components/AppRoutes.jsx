import { Routes, Route } from "react-router-dom";
import PostsList from "../features/posts/PostsList";
import PostDetails from "../features/posts/PostDetails";
import NewPostForm from "../features/posts/NewPostForm";
import EditPostForm from "../features/posts/EditPostForm";
import PostForm from "../features/posts/PostForm";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/new" element={<NewPostForm />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/posts/edit/:id" element={<EditPostForm />} />
        </Routes>
    );
}
export default AppRoutes;