const { isAuth } = require("../middleware/authMiddleware");
const authService = require("../services/authService");

const router = require("express").Router();
const authCookieName = "auth";
const bsonToJson = (data) => {
  return JSON.parse(JSON.stringify(data));
};
const removePassword = (data) => {
  const { password, __v, ...userData } = data;
  return userData;
};

router.post("/register", async (req, res, next) => {
  const userData = req.body;
  try {
    const { token, data } = await authService.register(userData);
    let createdUser = bsonToJson(data);
    createdUser = removePassword(createdUser);
    res.cookie(authCookieName, token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).send(createdUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const userData = req.body;
  try {
    const { token, data } = await authService.login(userData);
    let createdUser = bsonToJson(data);
    createdUser = removePassword(createdUser);
    res.cookie(authCookieName, token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).send(createdUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/logout", isAuth, async (req, res) => {
  const token = req.cookies[authCookieName];
  try {
    await authService.logout(token);
    res
      .clearCookie(authCookieName, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(204)
      .send({ message: "Logged out!" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/profile", isAuth, async (req, res) => {
  const { _id: userId } = req.user;
  try {
    let user = await authService.getProfile(userId);
    user = bsonToJson(user);
    user = removePassword(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/profile", isAuth, async (req, res) => {
  const { _id: userId } = req.user;
  const userData = req.body;
  try {
    const updatedUser = await authService.updateProfile(userId, userData);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = authController = router;
