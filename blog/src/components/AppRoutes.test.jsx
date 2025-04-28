import AppRoutes from './AppRoutes';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock("../features/posts/PostsList", () => {
    const MockPostList = () => (
        <div>Your Matcher for PostList components</div>
    )
    return MockPostList;
});

jest.mock("../features/posts/PostDetails", () => {
    const MockPostDetails = () => (
        <div>Your Matcher for PostDetails components</div>
    )
    return MockPostDetails;
});

jest.mock("../features/posts/EditPostForm", () => {
    const MockEditPostForm = () => (
        <div>Your Matcher for EditPostForm components</div>
    )
    return MockEditPostForm;
});

jest.mock("../features/posts/NewPostForm", () => {
    const MockNewPostForm = () => (
        <div>Your Matcher for NewPostForm components</div>
    )
    return MockNewPostForm;
});

jest.mock("../constants", () => ({
    API_URL: "http://test-api-url"
}));


describe('AppRoutes', () => {
    const renderWithRouter = (ui, { initialEntries = ["/"] } = {}) => {
        return render(ui, {
            wrapper: ({ children }) =>
            (
                <MemoryRouter initialEntries={initialEntries}>
                    {children}
                </MemoryRouter>
            )
        });
    };
    test('root paths render PostList', () => {
        renderWithRouter(<AppRoutes />, { initialEntries: ["/"] });
        //testing links
        const expectedText = "Your Matcher for PostList components";
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    test('root paths render PostDetails', () => {
        renderWithRouter(<AppRoutes />, { initialEntries: ["/posts/1"] });
        //testing links
        const expectedText = "Your Matcher for PostDetails components";
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    test('root paths render EditPostForm', () => {
        renderWithRouter(<AppRoutes />, { initialEntries: ["/posts/edit/1"] });
        //testing links
        const expectedText = "Your Matcher for EditPostForm components";
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    test('root paths render NewPostForm', () => {
        renderWithRouter(<AppRoutes />, { initialEntries: ["/new"] });
        //testing links
        const expectedText = "Your Matcher for NewPostForm components";
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
});


