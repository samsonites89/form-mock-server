const express = require("express");
const router = express.Router();
const {getConfig, saveConfig} = require("../service/config-service");


/* GET configs page page. */
router.get("/", async (req, res, next) => {
  try {
    const config = await getConfig();
    res.render("config", {config: config});
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  saveConfig(req.body.secret);
});


module.exports = router;
