const { Article } = require("../model");

exports.showIndex = async (req, res, next) => {
  try {
    const page = req.query.page ? Number.parseInt(req.query.page) : 1;
    const pageSize = 3;

    const articles = await Article.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const articlesCount = await Article.count();

    res.render("index", {
      articles,
      page,
      pageSize,
      articlesCount,
      totalPage: Math.ceil(articlesCount / pageSize),
    });
  } catch (error) {
    next(error);
  }
};
exports.showEditor = async (req, res, next) => {
  try {
    res.render("editor");
  } catch (error) {
    next(error);
  }
};
exports.showArticle = async (req, res, next) => {
  try {
    res.render("article");
  } catch (error) {
    next(error);
  }
};

exports.createArticle = async (req, res, next) => {
  try {
    const article = new Article({
      ...req.body.article,
      author: req.session.user._id,
    });
    await article.save();
    res.status(201).json({ article });
  } catch (error) {
    next(error);
  }
};
