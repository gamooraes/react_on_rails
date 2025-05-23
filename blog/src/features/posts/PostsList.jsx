//API URL comes from the .env.development file
import { useState, useEffect, use } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchAllPosts, deletePost as deletePostService } from "../../services/postService";
import SearchBar from "./SerachBar";
import Pagination from "./Pagination";
import usePostData from '../../hooks/usePostData';
import useURLSearchParam from '../../hooks/useURLSearchParam';

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setdebouncedSearchTerm] =
        useURLSearchParam("serach")
    const [searchParams, setSearchParams] = useSearchParams();
    const initialPageFromURL = Number(searchParams.get("page") || "1");
    const [currentPage, setCurrentPage] = useState(initialPageFromURL)
    const navigate = useNavigate();

    const {
        posts: fetchedPost,
        totalPosts,
        perPage,
        loading,
        error,

    } = usePostData(debouncedSearchTerm, currentPage);
    // Fetch posts from API
    useEffect(() => {
        if (fetchedPost) {
            setPosts(fetchedPost)
        }
    }, [fetchedPost])

    useEffect(() => {
        const initialSearchTerm = searchParams.get("search") || "";
        setSearchTerm(initialSearchTerm);

        const pageFromURL = searchParams.get("page") || "1";
        setCurrentPage(Number(pageFromURL))
    }, [searchParams])
    // Delete post
    async function deletePost(id) {
        try {
            await deletePostService(id);
            setPosts(posts.filter((post) => post.id !== id));
            navigate("/");
        } catch (e) {
            console.error("An error occurred. Awkward...", e);
        }
    }

    const handleImmediateSearchChange = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleDebouncedSearchChange = (searchValue) => {
        setdebouncedSearchTerm(searchValue);
    };

    const handlePageChance = (page) => {
        setCurrentPage(page);

        setSearchParams({ search: debouncedSearchTerm, page: page });
    };
    if (!posts || posts.length === 0) return null;
    return <div>
        <SearchBar
            value={searchTerm}
            onSearchChange={handleDebouncedSearchChange}
            onImmediateChange={handleImmediateSearchChange}
        />
        {loading && <p>Loading...</p>}
        {error && <p>Error lodaing posts.</p>}
        {posts.map((post) => (
            <div key={post.id} className="post-container">
                <h2>
                    <Link to={`posts/${post.id}`} className="post-title">
                        {post.title}
                    </Link>
                </h2>
                <div className="post-image-container">
                    {post.image_url ? (<img src={post.image_url} alt={post.title} className="post-image" />) : (<div className="post-image-stub" />)}
                </div>
                <div className="post-links">
                    <Link to={`/posts/${post.id}`} className="post-link">
                        View
                    </Link>
                    {" | "}
                    <Link to={`/posts/edit/${post.id}`} className="post-link">
                        Edit
                    </Link>
                    {" | "}
                    <button onClick={() => deletePost(post.id)} className="post-link">
                        Delete
                    </button>
                </div>
            </div>
        ))}
        <Pagination
            currentPage={currentPage}
            totalPosts={totalPosts}
            postsPerPage={perPage}
            OnPageChange={handlePageChance}
        />
    </div>
}
export default PostsList;