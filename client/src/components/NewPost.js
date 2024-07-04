import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewPost.css';

const NewPost = ({ token }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      const response = await axios.post('http://localhost:5000/posts/upload', formData, config);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating post', error);
      // Implement error handling, e.g., show error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-post-form">
      <h1>Create a New Post</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="form-input"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="form-input"
        required
      ></textarea>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="form-input"
      />
      <button type="submit" className="form-button">Submit</button>
    </form>
  );
};

export default NewPost;
