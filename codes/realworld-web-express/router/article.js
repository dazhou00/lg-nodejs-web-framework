const express = require("express");
const articleCtrl = require("../controller/article");
const auth = require("../middleware/auth");
const articleValidator = require("../validator/article");

const router = express.Router();
// 首页
router.get("/", articleCtrl.showIndex);
// 发布文章
router.get("/editor", auth, articleCtrl.showEditor);
// 编辑文章
router.get("/editor/:articleId", auth, articleCtrl.showEditor);
// 文章详情
router.get("/article/:articleId", auth, articleCtrl.showArticle);

router.post(
  "/articles",
  auth,
  articleValidator.createArticle,
  articleCtrl.createArticle
);

module.exports = router;
