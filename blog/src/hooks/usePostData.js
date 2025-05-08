import { useState, useEffect } from "react";
import { fetchAllPosts, searchPosts } from "../services/postService";

function usePostData(searchTerm) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrror] = useState(null);

    useEffect(() => {
        async function loadPost() {
            try {
                let data
                if (searchTerm) {
                    data = await searchPosts(searchTerm);
                } else {
                    data = await fetchAllPosts();
                }
                setPosts(data);
                setLoading(false);
            } catch (e) {
                setErrror(e);
                setLoading(false);
                console.error("Failed to fetch posts: ", e);
            }
        }
        loadPost()
    }, [searchTerm])

    return { posts, loading, error }
}

export default usePostData;