import { objectToFormData, formDataToObject } from "./formDataHelper";

describe("objectToFormData", () => {

    it("should convert object to FormData", () => {
        const expected_obj = {
            title: "Title",
            body: "Body",
        };
        const actual_obj = objectToFormData(expected_obj);
        expect(actual_obj.get("title")).toEqual(expected_obj.title);
        expect(actual_obj.get("body")).toEqual(expected_obj.body);

    });

    it("should handle nested objects", () => {
        const expected_obj = {
            post: {
                title: "Title",
                body: "Body",
            },
        };
        const actual_obj = objectToFormData(expected_obj);
        expect(actual_obj.get("post[title]")).toEqual(expected_obj.post.title);
        expect(actual_obj.get("post[body]")).toEqual(expected_obj.post.body);
    });
    it("should handle arrays", () => {
        const expected_obj = {
            tags: ["tag1", "tag2"],
        };
        const actual_obj = objectToFormData(expected_obj);
        expect(actual_obj.get("tags[0]")).toEqual(expected_obj.tags[0]);
        expect(actual_obj.get("tags[1]")).toEqual(expected_obj.tags[1]);
    });
    it("should handle Date objects", () => {
        const expected_obj = {
            title: "Hello World!",
            body: "This is test",
            created_at: new Date("2025-01-01"),
        }
        const actual_obj = objectToFormData(expected_obj);
        expect(actual_obj.get("created_at")).toEqual(expected_obj.created_at.toISOString());
    });
    it("should handle File objects", () => {
        const file = new File(["content"], "test.txt", { type: "text/plain" });
        const expected_obj = {
            title: "Hello World!",
            body: "This is test",
            image: file,
        }
        const actual_obj = objectToFormData(expected_obj);
        expect(actual_obj.get("image")).toEqual(file);
    }
    );
});

describe("formDataToObject", () => {
    it("should convert FormData to object", () => {
        const formData = new FormData();
        formData.append("title", "Test Title");
        formData.append("body", "Test Body");

        const result = formDataToObject(formData);
        expect(result).toEqual({
            title: "Test Title",
            body: "Test Body",
        });
    });
});