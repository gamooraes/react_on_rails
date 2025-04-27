import React from "react";
import { Routes, Route } from "react-router-dom";
import PostsList from "../features/posts/PostsList";
import PostDetails from "../features/posts/PostDetails";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/new" element={<h2>New Post</h2>} />
            <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>
    );
}
export default AppRoutes;