const { User } = require("../model");

exports.showLogin = async (req, res, next) => {
  try {
    res.render("login", {
      isLogin: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.showRegister = async (req, res, next) => {
  try {
    res.render("login", {
      foo: "server foo",
    });
  } catch (error) {
    next(error);
  }
};

// 用户登录
exports.login = async (req, res, next) => {
  try {
    const user = req.user;
    req.session.user = user;

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

//  用户注册
exports.register = async (req, res, next) => {
  try {
    const user = new User(req.body.user);
    await user.save();

    req.session.user = user;

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

exports.showSettings = async (req, res, next) => {
  try {
    res.render("settings");
  } catch (error) {
    next(error);
  }
};

exports.showProfile = async (req, res, next) => {
  try {
    res.render("profile");
  } catch (error) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    // 清除用户登录状态
    req.session.user = null;
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
