const { SECRET } = require("../config/config");
const jwtService = require("../lib/jwt");
const TokenBlackList = require("../model/TokenBlackList");
const User = require("../model/User");
const bcrypt = require("bcrypt");

const register = async (userData) => {
  if (userData.password !== userData.rePassword) {
    throw new Error("Password and repeat password must match");
  }

  const user = await User.findOne({ email: userData.email });

  if (user) {
    throw new Error(`User already exists!`);
  }

  const createdUser = await User.create(userData);

  const token = await generateToken(createdUser);

  return { token, data: createdUser };
};

const login = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new Error("Email or password invalid");
  }

  const isValid = await bcrypt.compare(userData.password, user.password);

  if (!isValid) {
    throw new Error("Email or password invalid");
  }
  const token = await generateToken(user);
  return { token, data: user };
};

const logout = async (token) => {
  await TokenBlackList.create({ token });
};

const getProfile = async (id) => {
  return await User.findOne({ _id: id });
};

const updateProfile = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { runValidators: true });
};

const authService = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
};

module.exports = authService;

function generateToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  //expires after 24h
  return jwtService.sign(payload, SECRET, { expiresIn: "24h" });
}
