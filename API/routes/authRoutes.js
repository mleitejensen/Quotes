const { Router } = require('express');
const router = Router()
const { signup, login } = require("../controllers/authController")

router.post("/signup", signup)
router.post("/login", login)

module.exports = router