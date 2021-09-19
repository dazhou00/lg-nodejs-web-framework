const express = require("express");
const userCtrl = require("../controller/user");
const userValidator = require("../validator/user");
const auth = require("../middleware/auth");
const noAuth = require("../middleware/no-auth");

const router = express.Router();

// 登录
router.get("/login", noAuth, userCtrl.showLogin);

router.post("/login", noAuth, userValidator.login, userCtrl.login);

// 注册
router.get("/register", noAuth, userCtrl.showRegister);

router.post("/register", userValidator.register, userCtrl.register);

// 退出登录
router.get("/logout", userCtrl.logout);
// 设置
router.get("/settings", auth, userCtrl.showSettings);
// 用户资料
router.get("/profile/:username", userCtrl.showProfile);
// 查看用户喜好
router.get("/profile/:username/favorites", userCtrl.showProfile);

module.exports = router;
