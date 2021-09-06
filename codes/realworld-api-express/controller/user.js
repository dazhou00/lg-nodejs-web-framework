const { User } = require("../model");
const jwt = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");
// 用户登录
exports.login = async (req, res, next) => {
  try {
    const user = req.user.toJSON();
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret,
      {
        expiresIn: 60 * 60 * 24, // 设置过期时间
      }
    );
    delete user.password;
    res.status(200).json({
      ...user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

//  用户注册
exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body.user);
    await user.save();

    user = user.toJSON();

    delete user.password;

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

//  获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

//  更新用户
exports.updateCurrentUser = async (req, res, next) => {
  try {
    res.send("put /user");
  } catch (error) {
    next(error);
  }
};

// 获取指定用户资料
exports.getUserProfile = async (req, res, next) => {
  try {
    res.send("get /profiles/:username");
  } catch (error) {
    next(error);
  }
};

// 关注用户
exports.followUser = async (req, res, next) => {
  try {
    res.send("post /profiles/:username/follow");
  } catch (error) {
    next(error);
  }
};

// 取消关注用户
exports.unfollowUser = async (req, res, next) => {
  try {
    res.send("get /profiles/:username/follow");
  } catch (error) {
    next(error);
  }
};
