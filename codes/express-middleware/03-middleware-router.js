const express = require("express");
const app = express();
const router = express.Router();

router.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

router.use(
  "/user/:id",
  function (req, res, next) {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  function (req, res, next) {
    console.log("Request Type:", req.method);
    next();
  }
);

router.get(
  "/user/:id",
  function (req, res, next) {
    if (req.params.id === "0") next("route");
    else next();
  },
  function (req, res, next) {
    // render a regular page
    res.render("regular");
  }
);

router.get("/user/:id", function (req, res, next) {
  console.log(req.params.id);
  res.render("special");
});

app.use("/", router);

app.listen(3000);
