const { Router } = require('express');
const router = Router()
const { signup, login } = require("../controllers/authController")
const passport = require("passport");

router.post("/signup", signup)
router.post("/login", login)

router.get("/auth/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/auth/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/auth/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/auth/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router