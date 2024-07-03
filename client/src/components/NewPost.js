import React, { useState } from 'react';
import axios from 'axios';

const NewPost = ({ token }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.post('http://localhost:5000/posts', { title, content }, config);
      console.log(response.data);
      // You can redirect or reset form fields after successful submission
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Post</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewPost;
