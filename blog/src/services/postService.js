//Services file to fetch posts from API, delete posts, create new posts and edit posts
import { POST_API_URL, SEARCH_API_URL } from "../constants";

async function fetchAllPosts(page = 1) {
    const response = await fetch(`${POST_API_URL}?page=${page}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function fetchPost(id) {
    const response = await fetch(`${POST_API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function createPost(postData) {
    const response = await fetch(`${POST_API_URL}`, {
        method: "POST",
        body: postData,
    });
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(response.statusText);
    }
}

async function updatePost(id, postData) {
    const response = await fetch(`${POST_API_URL}/${id}`, {
        method: "PUT",
        body: postData
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function deletePost(id) {
    const response = await fetch(`${POST_API_URL}/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        return true;
    } else {
        throw new Error(response.statusText);
    }
}

async function searchPosts(query, page = 1) {
    const response = await fetch(`${SEARCH_API_URL}/posts/?q=${query}&page=${page}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json()

}

export { fetchAllPosts, fetchPost, createPost, deletePost, updatePost, searchPosts };