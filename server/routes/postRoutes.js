const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  uploadImage
} = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost); // Create post without image
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/upload', auth, upload.single('image'), uploadImage); // Create post with image

module.exports = router;
