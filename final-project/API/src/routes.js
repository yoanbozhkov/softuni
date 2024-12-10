const authController = require("./controllers/authController");
const tennisForumController = require("./controllers/tennisForumController");

const router = require("express").Router();

router.use("/api/auth", authController);
router.use("/api/posts", tennisForumController);

module.exports = router;
