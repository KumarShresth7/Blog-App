import React from 'react';
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';

const Navbar = ({handleLogout}) => {
  let navigate = useNavigate()
  // Dummy logout function
  const handleCreatePost = () => {
    // Implement your create post logic here
    navigate('/new')
    console.log("Create Post clicked");
  };
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(to right, #4ca1af, #c4e0e5)' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">BlogIt!</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            {/* Logout Button */}
            <button className="btn btn-outline-dark ms-2" onClick={handleCreatePost}>Create Post</button>
            <button className="bg-green btn btn-outline-dark ms-2" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
