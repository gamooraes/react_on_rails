import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PostForm from './PostForm';
import * as postsService from '../../services/postService';

jest.mock("../../constants", () => ({
    API_URL: "http://test-api-url"
}));
describe('PostForm', () => {
    const mockPost = {
        title: 'Test Title',
        body: 'Test Body',
    };

    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the form with empty fields when no post is provided', () => {
        render(
            <MemoryRouter>
                <PostForm
                    headerText="Create Post"
                    onSubmit={mockOnSubmit}
                    buttonText="Submit"
                />
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/title/i)).toHaveValue('');
        expect(screen.getByLabelText(/body/i)).toHaveValue('');
    });
    test('renders the form with pre-filled fields when a post is provided', () => {
        render(
            <MemoryRouter>
                <PostForm
                    post={mockPost}
                    headerText="Edit Post"
                    onSubmit={mockOnSubmit}
                    buttonText="Update"
                />
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/title/i)).toHaveValue(mockPost.title);
        expect(screen.getByLabelText(/body/i)).toHaveValue(mockPost.body);
    });
});