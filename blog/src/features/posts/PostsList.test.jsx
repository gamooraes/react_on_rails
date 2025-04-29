import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PostsList from './PostsList';
import * as postsService from '../../services/postService';

jest.mock("../../services/postService", () => ({
    fetchAllPosts: jest.fn(),
    deletePost: jest.fn(),
}));

jest.mock("../../constants", () => ({
    API_URL: "http://test-api-url"
}));

global.console.error = jest.fn();

describe('PostsList', () => {
    const mockPosts = [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
    ];

    const postText = "Post 1";
    const fetchError = new Error("An error occurred");
    const deleteError = new Error("Delete failed");

    beforeEach(() => {
        postsService.fetchAllPosts.mockResolvedValue(mockPosts);
    });


    test('renders PostsList', async () => {
        render(<PostsList />, { wrapper: MemoryRouter });

        await waitFor(() => { screen.getByText(postText); });

        expect(screen.getByText("Post 1")).toBeInTheDocument();
        expect(screen.getByText("Post 2")).toBeInTheDocument();
    });

    test("test if the post is deleted and the post is not in the document", async () => {
        render(<PostsList />, { wrapper: MemoryRouter });

        await waitFor(() => { screen.getByText(postText); });

        fireEvent.click(screen.getAllByText("Delete")[0]);

        await waitFor(() => { expect(postsService.deletePost).toHaveBeenCalled(); });

        expect(screen.queryByText(postText)).not.toBeInTheDocument();
    });

    test("testing for error logs when the fetch fails", async () => {
        postsService.fetchAllPosts.mockRejectedValue(fetchError);
        render(<PostsList />, { wrapper: MemoryRouter });

        await waitFor(() => expect(console.error).toHaveBeenCalledWith("Failed to fetch a post. Awkward...", fetchError));
    });

    test("testing for deleteing error logs when the delete fails", async () => {
        postsService.fetchAllPosts.mockResolvedValue(mockPosts);
        postsService.deletePost.mockRejectedValue(deleteError);
        render(<PostsList />, { wrapper: MemoryRouter });

        await waitFor(() => { screen.getByText(postText); });

        fireEvent.click(screen.getAllByText("Delete")[0]);

        await waitFor(() => expect(console.error).toHaveBeenCalledWith("An error occurred. Awkward...", deleteError));
    });

    test("renders null when posts is undefined", () => {
        postsService.fetchAllPosts.mockResolvedValue(undefined);

        const { container } = render(<PostsList />, { wrapper: MemoryRouter });

        expect(container.firstChild).toBeNull();
    });
});
