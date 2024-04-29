const DataModel = require("../models/dataModel")
const User = require("../models/userModel")

const maxBodyLength = 100
const latestPosts = 5

const getLatest = async (req, res) => {
    try{
        let latestList = []
        const dataList = await DataModel.find({}).sort({ createdAt: 'desc'}).exec();
        for(let i = 0; i < latestPosts; i++){
            latestList.push(dataList[i])
        }
        let result=createFeedback(200, 'List of the 5 latest posts', true, latestList);
        
        res.status(result.statuscode).json(result)
    } catch(error){
        let result= createFeedback(400, error.message);
        res.status(result.statuscode).json(result)
    }
}

const createPost = async (req, res) => {
    const {username, origin, body} = req.body
    try{
        if(!username || !body.trim() || !origin.trim()){
            throw Error("All fields must be filled.")
        }
        if(body.length > maxBodyLength){
            throw Error("Max body length is 100 characters")
        } 
        const created = await DataModel.create({username, origin, body})
        res.status(202).json(created)
    } catch(error){
        res.status(400).json({ error: error.message })
    }
}

const getUserPosts = async (req, res) => {
    const user = req.params.user
    try{
        const posts = await DataModel.find({username: user}).sort({ createdAt: 'desc'}).exec()

        if(posts.length === 0){
            throw Error("User has no posts, or the user does not exist")
        }
        
        res.status(202).json(posts)
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const deletePost = async (req, res) => {
    const {postID} = req.body
    try{
        const findPost = await DataModel.findOne({_id: postID})
        const findUser = await User.findOne({_id: req.user._id})
        if(findPost.username !== findUser.username){
            console.log(findPost.username, findUser.username)
            throw Error("You do not own that post")
        }
        const deletePost = await DataModel.deleteOne({_id: postID})
        res.status(200).json(deletePost)

    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const randomPost = async (req, res) => {
    try{
        const findPosts = await DataModel.find()
        const randomIndex = Math.random() * (findPosts.length)
        const random = findPosts[Math.floor(randomIndex)]
        res.status(200).json(random)

    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const updateLike = async (req, res) => {
    const {postID} = req.body
    try{
        if(!postID){
            throw Error("No post received")
        }
        const findPost = await DataModel.findOne({_id: postID})
        if(findPost.likes.includes(req.user._id)){
            const update = await DataModel.findOneAndUpdate({_id: postID}, { $pull: {likes: req.user._id}}, {new: true})
            res.status(200).json(update)
        }
        if(!findPost.likes.includes(req.user._id)){
            const update = await DataModel.findOneAndUpdate({_id: postID}, { $push: {likes: req.user._id}}, {new: true})
            res.status(200).json(update)
        }

    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const getPost = async (req, res) => {
    const id = req.params.id
    try{
        const findPost = await DataModel.findOne({_id: id})
        res.status(200).json(findPost)
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const editPost = async (req, res) => {
    const {postID, newBody, newOrigin } = req.body
    try{
        findUser = await User.findOne({_id: req.user._id})
        findPost = await DataModel.findOne({_id: postID})
        if(!findUser.username === findPost.username){
            throw Error("You are not authorized to edit this post")
        }

        const updatePost = await DataModel.findOneAndUpdate({_id: postID}, {body: newBody, origin: newOrigin}, {new: true})

        res.status(200).json(updatePost)
    }catch(error){
        res.status(400).json({ error: error.message })
    }
} 

const createFeedback = (statuscode, feedback, isSuccess=false, payload=null) => {
    return {
        statuscode,
        feedback,
        isSuccess,
        payload
    }
}

module.exports = {
    getLatest,
    createPost,
    getUserPosts,
    deletePost,
    randomPost,
    updateLike,
    getPost,
    editPost,
}