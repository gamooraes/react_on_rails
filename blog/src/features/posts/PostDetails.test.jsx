import { MemoryRouter, Routes, Route } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PostDetails from "./PostDetails";
import * as postsService from "../../services/postService";
import { API_URL } from "../../constants";

jest.mock("../../services/postService", () => ({
    fetchPost: jest.fn(),
    deletePost: jest.fn(),
}));

jest.mock("../../constants", () => ({
    API_URL: "http://test-api-url",
}));

const mockPost = {
    id: 1,
    title: "Post 1",
    body: "This is the body of Post 1",
};
const postText = "Post List";
const fetchError = new Error("Failed to fetch.");
const deleteError = new Error("Delete failed");

describe("PostDetails", () => {
    beforeEach(() => {
        postsService.fetchPost.mockResolvedValue(mockPost);
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
        consoleSpy.mockRestore();
    });

    const renderComponents = () => {
        render(<MemoryRouter initialEntries={[`/posts/${mockPost.id}`]}>
            <Routes>
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/" element={<div>Post List</div>} />
            </Routes>
        </MemoryRouter>);
    };

    test("renders PostDetails", async () => {
        renderComponents();

        await waitFor(() => {
            expect(screen.getByText(mockPost.title)).toBeInTheDocument();
            expect(screen.getByText(mockPost.body)).toBeInTheDocument();
        });
    });

    test("handle error when fetchin the post details", async () => {
        postsService.fetchPost.mockRejectedValue(fetchError);
        renderComponents();

        await waitFor(() => { expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch a post. Awkward...", fetchError) });

    });

    test("test if the post is deleted and the post is not in the document", async () => {
        renderComponents();

        postsService.deletePost.mockRejectedValue();

        await waitFor(() => {
            fireEvent.click(screen.getByText("Delete"));
        });

        await waitFor(() => {
            expect(screen.queryByText(postText)).toBeInTheDocument();
        });
    });
    test("handle error when deleting the post", async () => {
        postsService.deletePost.mockRejectedValue(deleteError);
        renderComponents();

        await waitFor(() => {
            expect(screen.getByText(mockPost.title)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Delete"));

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith("An error occurred. Awkward...", deleteError);
        });


    });
}); 