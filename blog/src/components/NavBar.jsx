import React from 'react';
import { Link } from 'react-router-dom';
// Post list link (root path) | Link to create New Post (Post Form)

function NavBar() {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">Posts List</Link>
            {" | "}
            <Link to="/new" className="nav-link">New Post</Link>
        </nav>
    );
}


export default NavBar;