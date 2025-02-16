import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BlogList.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { baseUrl } from '../baseUrl';

const BlogList = ({ setToken }) => {
  const [posts, setPosts] = useState([]);
  const cardStyle = {
    width: '18rem',
    marginBottom: '20px',
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/posts`);
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
    <div>
      <Navbar handleLogout={handleLogout}/>
      <div className="container">
        <div className="container2">
          {posts.map(post => (
            <div key={post._id} className="card" style={cardStyle}>
              {post.image && (
                <img
                  src={`${baseUrl}${post.image}`} // Adjust path as per your server setup
                  className="card-img-top"
                  alt="Post Image"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
                <div className="btn btn-primary">Author: {post.user.username}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogList;
