import { MemoryRouter, Routes, Route } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EditPostForm from "./EditPostForm";
import * as postsService from "../../services/postService";
import { objectToFormData } from "../../utils/formDataHelper";

jest.mock("../../services/postService", () => ({
    updatePost: jest.fn(),
    fetchPost: jest.fn()
}));

describe("EditPostForm", () => {
    const mockPost = {
        title: "Post 1",
        body: "This is the body of Post 1",
    };
    const updatedPostError = new Error("Failed to update.");
    const fetchError = new Error("Failed to fetch.");

    const renderComponents = () => {
        render(
            <MemoryRouter initialEntries={[`/posts/edit/1`]}>
                <Routes>
                    <Route path="/posts/edit/:id" element={<EditPostForm />} />
                    <Route path="/posts/:id" element={<div>Post Details</div>} />
                </Routes>
            </MemoryRouter>
        );
    };
    beforeEach(() => {
        postsService.fetchPost.mockResolvedValue(mockPost);
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });
    afterEach(() => {
        jest.clearAllMocks();
        consoleSpy.mockRestore();
    });
    test("renders EditPostForm", async () => {
        renderComponents();
        await waitFor(() => {
            expect(postsService.fetchPost).toHaveBeenCalledTimes(1);
        });
        await waitFor(() => {
            expect(screen.getByDisplayValue(mockPost.title)).toBeInTheDocument();
            expect(screen.getByDisplayValue(mockPost.body)).toBeInTheDocument();
        });
    });

    test("update the post", async () => {
        renderComponents();
        await waitFor(() => {
            expect(postsService.fetchPost).toHaveBeenCalledTimes(1);
        });

        const updatedPost = {
            title: "Updated Post",
            body: "This is the updated body of Post 1",
            image: null
        };

        const fomrData = objectToFormData({ post: updatedPost });
        await waitFor(() => {
            postsService.updatePost.mockResolvedValue(fomrData);
        });

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: updatedPost.title } });
        fireEvent.change(screen.getByLabelText(/body/i), { target: { value: updatedPost.body } });

        await waitFor(() => { fireEvent.click(screen.getByText(/Update Post/i)); });
        await waitFor(() => {
            expect(postsService.updatePost).toHaveBeenCalledWith("1", fomrData);
        });
        await waitFor(() => {
            expect(screen.getByText("Post Details")).toBeInTheDocument();
        });
    });

    test("handle error when fetching the post", async () => {
        postsService.fetchPost.mockRejectedValue(fetchError)
        renderComponents();

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch a post. Awkward...", fetchError);
        });
    })

    test("handle error when updating the post", async () => {
        renderComponents();

        await waitFor(() => {
            expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        });

        const updatedPost = {
            title: "Updated Post",
            body: "This is the updated body of Post 1",
        };

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: updatedPost.title } });
        fireEvent.change(screen.getByLabelText(/body/i), { target: { value: updatedPost.body } });

        postsService.updatePost.mockRejectedValue(updatedPostError);

        fireEvent.click(screen.getByText(/Update Post/i));

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith("Failed to update a post: ", updatedPostError);
        });
    });
});