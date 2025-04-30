import { MemoryRouter, Routes, Router } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NewPostForm from "./NewPostForm";
import * as postsService from "../../services/postService";


const expectedTitle = "Post 1";
const expectedBody = "This is the body of Post 1";
const errorMessage = new Error("Failed to create a post")


const fillForm = (title, body) => {
    const titleInput = screen.getByLabelText(/title/i);
    const bodyInput = screen.getByLabelText(/body/i);
    const submitButton = screen.getByRole("button", { name: /create post/i });

    fireEvent.change(titleInput, { target: { value: title } });
    fireEvent.change(bodyInput, { target: { value: body } });

    return { titleInput, bodyInput, submitButton };
};

jest.mock("../../services/postService", () => ({
    createPost: jest.fn(() => {
        return {
            id: 1,
            title: "Post 1",
            body: "This is the body of Post 1",
        }
    })
}));

describe("NewPostForm", () => {

    beforeEach(() => {
        render(<NewPostForm />, { wrapper: MemoryRouter });
    });

    afterEach(() => {
        jest.clearAllMocks();
    }
    );

    test("renders NewPostForm", () => {
        expect(screen.getByText("Create a New Post")).toBeInTheDocument();
    });

    test("Allow to type in the form", () => {
        const { titleInput, bodyInput, submitButton } = fillForm(expectedTitle, expectedBody);

        expect(titleInput.value).toBe(expectedTitle);
        expect(bodyInput.value).toBe(expectedBody);
        expect(submitButton).toBeInTheDocument();
    });

    test("submits the form and creates a new post", async () => {
        const { submitButton } = fillForm(expectedTitle, expectedBody);

        await waitFor(() => { fireEvent.click(submitButton); });

        await waitFor(() => {
            expect(postsService.createPost).toHaveBeenCalledWith({ title: expectedTitle, body: expectedBody });
            expect(window.location.pathname).toBe("/");
        });
    });
    test("handle error when creating a post", async () => {
        postsService.createPost.mockRejectedValue(errorMessage);
        const { submitButton } = fillForm(expectedTitle, expectedBody);
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        await waitFor(() => { fireEvent.click(submitButton); });

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith("An error occurred. Awkward...", errorMessage);
        });
        consoleSpy.mockRestore();
    });

});