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

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}

