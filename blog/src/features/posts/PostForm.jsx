import { useState } from "react";
import PropTypes from "prop-types";

function PostForm({ post, headerText, onSubmit, buttonText }) {
    const [formData, setFormData] = useState(post || {
        title: "",
        body: "",
    });

    return (
        <div>
            <h2>{headerText}</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formData);
            }}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    ></textarea>
                </div>
                <button type="submit" >
                    {buttonText}
                </button>
            </form>
        </div>
    )
};

PostForm.PropTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
    }),
    headerText: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
};

PostForm.defaultProps = {
    post: null
};

export default PostForm;