module.exports = async (req, res, next) => {
  const sessionUser = req.session.user;
  if (sessionUser) return res.redirect("/");

  next();
};
