// 获取标签列表
exports.getTags = async (req, res, next) => {
  try {
    res.send("get /api/tags");
  } catch (error) {
    next(error);
  }
};
