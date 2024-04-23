const { Router } = require('express');
const router = Router()
const { getLatest, createPost, getUserPosts, deletePost, randomPost, updateLike, getPost } = require("../controllers/dataController")
const {requireAuth} = require("../middleware/requireAuth")

router.get("/random", randomPost)
router.get("/latest", getLatest)
router.get("/user/:user", getUserPosts)
router.get("/post/:id", getPost)

router.use(requireAuth)
router.post("/post", createPost)
router.delete("/delete", deletePost)
router.patch("/like", updateLike)

module.exports = router