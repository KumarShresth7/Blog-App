const Post = require('../models/Post')

const getPosts = async(req,res)=>{
    try {
        const posts = await Post.find().populate('user','username')
        res.json(posts) 
    } catch (error) {
        console.log(error)
    }
}

const getPost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id).populate('user','username')
        if(post==null){
            return res.json({message:'Cannot find post'})
        } 
        res.json(post)
    } catch (error) {
        console.log(error)
    }
}

const createPost = async(req,res)=>{
    const post = new Post({
        title:req.body.title,
        content:req.body.content,
        user:req.user.userId
    }) 
    try {
        const newPost = await post.save()
        res.json(newPost)
    } catch (error) {
        console.log(error)
    }
}

const updatePost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        if (post.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'User not authorized' });
          }
      
          if (req.body.title != null) {
            post.title = req.body.title;
          }
          if (req.body.content != null) {
            post.content = req.body.content;
          }
          
          const updatedPost = await post.save();
          res.json(updatedPost);

    } catch (error) {
        console.log(error)
    }
}

const deletePost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
          }
      
        if (post.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'User not authorized' });
          }
        await post.remove()
        res.json({msg:'Deleted post'})
    } catch (error) {
        console.log(error)
    }
}


const uploadImage = async (req, res) => {
    try {
      console.log('Request body:', req.body); // Log request body
      console.log('Request file:', req.file); // Log request file
  
      const { title, content } = req.body;
      let image = null;
  
      // Check if file exists in request
      if (req.file) {
        image = `/uploads/${req.file.filename}`;
      }
  
      // Ensure both title and content are provided
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }
  
      const post = new Post({ title, content, image, user: req.user.userId}); // Assign user ID
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      console.error('Error creating post:', err); // Log error
      res.status(500).json({ message: 'Error creating post', error: err.message });
    }
  };

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    uploadImage
}

