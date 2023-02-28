const Blog = require('./blog')

module.exports = getAllBlogs = async(req, res, next)=>{
    let blogs;
    try{
        blogs = await Blog.find();

    }catch(err){
        return console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message:"no blogs"})
    }
    return res.status(200).json({blogs})
}


module.exports = createBlogs = async(req, res, next)=>{
    const{ title, user, description}=req.body

    let existingUser;
    try{
        existingUser = await User.findById(user)
    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message:"unable to find user by id"})
    }
    const blog = new Blog({
        title, user, description
    })
    try {
       const session = await mongoose.startSession();
       session.startTransaction()
       await blog.save({session})
       existingUser.blogs.push(blog);
       await existingUser.save({session})
       await session.commitTransaction();
    }catch (err){
         console.log(err)
         return res.status(500).json({message: err})
    }
    return res.status(200).json({blog})

}


module.exports = updateBlog = async(req, res, next)=>{
    const {title, description} = req.body
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate({blogId,
            title,
            description
    })
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({blog});
    }
}


module.exports = getById = async(req, res, next)=>{
    const id = req.params.id;
    let blog
    try{
        blog = Blog.findById(id)

    }catch(err){
        return  console.log(err)
    }
    if(!blog){
        return res.status(404).json({message:"no blog found"})
    }
    return res.status(200).json({blog})
}

module.exports = deleteBlog = async(req, res, next)=>{
     const id = req.params.id;
     let blog
     try{
        blog  = await Blog.findByIdAndDelete(id).populate('user')
        await blog.user.blogs.pull(blog);
     }catch(err){
        console.log(err)

     }
     if(!blog){
        return res.status(400).json({message:"unable to delete"})
     }
     return res.status(200).json({message:"blog deleted"})
}

const getByUserId = async (req, res, next)=>{
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs")

    }catch(err){
        return console.log(err)

    }

    if(!userBlogs){
        return res.status(404).json({message:"no blog found"})
    }
    return res.status(200).json({blogs:userBlogs})
}