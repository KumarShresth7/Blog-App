import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BlogList.css';

const BlogList = ({ setToken }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="container">
      <div className="link">
      <Link to='/new' className='semi-link'>Create Post</Link>
      </div>
      <button onClick={handleLogout} className='logout'>Logout</button>
      <div className="container2">
      {posts.map(post => (
        <div key={post._id} className='post'>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p><strong>Author:</strong> {post.user.username}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default BlogList;
