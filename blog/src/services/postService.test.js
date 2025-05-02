import fetchMock from "jest-fetch-mock";
import { fetchAllPosts, fetchPost, createPost, updatePost, deletePost } from "./postService"

jest.mock("../constants", () => ({
    API_URL: "http://api-test-url",
}));
const mockPostId = 1
const fetchAPI = (mockPostId) => {
    const mockData = [{ id: mockPostId, title: "Post 1", body: "This is the body of Post 1" }];
    fetch.mockResponseOnce(JSON.stringify(mockData));
    return mockData;

}

fetchMock.enableMocks();
describe("Post API tests", () => {

    beforeEach(() => {
        fetchMock.resetMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    })

    it("fetch all posts", async () => {
        const data = fetchAPI(mockPostId);
        const result = await fetchAllPosts();
        expect(result).toEqual(data);
    })

    it("fetch a single post", async () => {
        const data = fetchAPI(mockPostId);
        const result = await fetchPost(mockPostId);
        expect(result).toEqual(data);
    })

    it("create a new post", async () => {
        const mockData = { title: "Post 1", body: "This is the body of Post 1" };
        fetch.mockResponseOnce(JSON.stringify(mockData));
        const result = await createPost(mockData);
        expect(result).toEqual(mockData);
    })

    it("update a post", async () => {
        const data = fetchAPI(mockPostId);
        const result = await updatePost(mockPostId, data);
        expect(result).toEqual(data);
    })

    it("delete a post", async () => {
        const mockPostId = 1;
        fetch.mockResponseOnce(null, { status: 204 });
        const result = await deletePost(mockPostId);
        expect(result).toEqual(true);
    })

    it("handle error when fetching all posts", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
        await expect(fetchAllPosts()).rejects.toThrow();
    });

    it("handle error when fetchin a single post", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
        await expect(fetchPost(mockPostId)).rejects.toThrow();
    })

    it("handle error when creating a post", async () => {
        const mockData = { title: "Post 1", body: "This is the body of Post 1" };
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
        await expect(createPost(mockData)).rejects.toThrow();
    })

    it("handle error when updating a post", async () => {
        const mockData = { id: mockPostId, title: "Post 1", body: "This is the body of Post 1" }
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
        await expect(updatePost(mockPostId, mockData)).rejects.toThrow();
    })

    it("handle error when deleting a post", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
        await expect(deletePost(mockPostId)).rejects.toThrow();
    })
});