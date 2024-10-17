const express = require("express");
const router = express.Router();


/* GET home page. */
router.get("/", (req, res, _next) => {
  if (req.cookies["email"]) res.redirect("/");

  // res.cookie("email", "sam.son@ujet.cx", {maxAge: 900000, httpOnly: true});


  res.render("login", {});
});

// setEmail cookie
router.post("/setEmail", (req, res, _next) => {
  res.cookie("__session", req.body.email, {maxAge: 10800}).send("okay");
});

module.exports = router;
