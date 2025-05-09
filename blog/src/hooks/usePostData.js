import { useState, useEffect } from "react";
import { fetchAllPosts, searchPosts } from "../services/postService";

function usePostData(searchTerm, page = 1) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrror] = useState(null);
    const [totalPosts, setTotalPosts] = useState(0);
    const [perPage, setPerPage] = useState(10)

    useEffect(() => {
        async function loadPost() {
            try {
                let data
                if (searchTerm) {
                    data = await searchPosts(searchTerm, page);
                } else {
                    data = await fetchAllPosts(page);
                }
                if (data.posts) {
                    setPosts(data.posts);
                    setTotalPosts(data.total_count);
                    setPerPage(data.per_page);
                }
                setLoading(false);
            } catch (e) {
                setErrror(e);
                setLoading(false);
                console.error("Failed to fetch posts: ", e);
            }
        }
        loadPost()
    }, [searchTerm, page])

    return { posts, loading, error, totalPosts, perPage }
}

export default usePostData;