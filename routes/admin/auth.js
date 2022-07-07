const { Router } = require("express");
const router = Router();
const auth = require("../../controllers/admin/auth/index.js");
const multer = require("../../middleware/file");
const authMiddleware = require("../../middleware/auth");

// Get login
router.get("/login", auth.getLogin);

// Get profile
router.get("/profile", authMiddleware, auth.getProfile);

// Get profile
router.post(
  "/profile",
  authMiddleware,
  multer.single("adminImg"),
  auth.postProfile
);

// Logout
router.get("/logout", auth.logout);

// Post login
router.post("/login", auth.login);

// Get register
router.get("/register", auth.getRegister);

// Post register
router.post("/register", multer.single("adminImg"), auth.register);

module.exports = router;
