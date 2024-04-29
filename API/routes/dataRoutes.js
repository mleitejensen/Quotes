const { Router } = require('express');
const router = Router()
const { getLatest, createPost, getUserPosts, deletePost, randomPost, updateLike, getPost, editPost, addComment } = require("../controllers/dataController")
const {requireAuth} = require("../middleware/requireAuth")

router.get("/random", randomPost)
router.get("/latest", getLatest)
router.get("/user/:user", getUserPosts)
router.get("/post/:id", getPost)

router.post("/post", requireAuth, createPost)
router.delete("/delete", requireAuth, deletePost)
router.patch("/like", requireAuth, updateLike)
router.patch("/edit", requireAuth, editPost)
router.post("/comment", requireAuth, addComment)

router.use("*", (req, res) => res.status(404).json({message: "Route does not exist"}))

module.exports = router