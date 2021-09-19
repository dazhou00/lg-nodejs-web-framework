module.exports = async (req, res, next) => {
  // 检查 sessionUser 是否存在
  const sessionUser = req.session.user;
  if (sessionUser) return next();

  // 重定向到登录页面
  res.redirect("/login");
};
