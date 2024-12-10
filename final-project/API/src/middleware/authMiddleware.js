const { SECRET } = require("../config/config");
const jwtService = require("../lib/jwt");
const TokenBlackList = require("../model/TokenBlackList");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies["auth"];
  if (!token) {
    return next();
  }
  const blackListToken = await TokenBlackList.findOne({ token });
  if (blackListToken) {
    res.status(401).send({ message: "Invalid token!" });
    return;
  }
  try {
    const decodedToken = await jwtService.verify(token, SECRET);
    req.user = decodedToken;
    res.locals.isAuthenticated = true;
    res.locals.user = decodedToken;
    next();
  } catch (error) {
    await TokenBlackList.create({ token });
    res.clearCookie("auth", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(401).send({ message: "Invalid token!" });
  }
};

const isAuth = (req, res, next) => {
  if (!req.user) {
    res.status(401).send("Not Authenticated");
    return;
  }

  next();
};

module.exports = {
  authMiddleware,
  isAuth,
};
