import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BlogList.css';
import Navbar from './Navbar';
import Footer from './Footer';

const BlogList = ({ setToken }) => {
  const [posts, setPosts] = useState([]);
  const cardStyle = {
    width: '18rem'
  };

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
    <div>
      <Navbar/>
    <div className="container">
      <div className="link">
      <Link to='/new' className='semi-link'>Create Post</Link>
      </div>
      <button onClick={handleLogout} className='logout'>Logout</button>
      <div className="container2">
      {posts.map(post => (
        <div key={post._id} className="card" style={cardStyle}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.content}</p>
          <div className="btn btn-primary">Author: {post.user.username}</div>
        </div>
      </div> 
      ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default BlogList;



{/* <div key={post._id} className='post'>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p><strong>Author:</strong> {post.user.username}</p>
        </div> */}