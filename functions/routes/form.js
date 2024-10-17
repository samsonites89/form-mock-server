const express = require("express");
const router = express.Router();
const path = require("path");
const {CreateFormUriPayload,
  CreateFormCompletedPayload} = require("../service/form-service");

/* Forms URI API */
router.get("/", (req, res) => {
  res.sendFile(path.resolve("public/forms/web_html_form.html"));
});

// generate URㅑ
router.post("/uri", async (req, res) => {
  try {
    // this only works for local
    let baseURL = `${req.protocol}://${req.get("host")}`;

    // in cloud functions, we must use the referer value to get the correct url
    baseURL = "https://" + req.headers["x-forwarded-host"];

    const payload = await CreateFormUriPayload(baseURL, req.body);

    res.status(200).json(payload);
  } catch (err) {
    res.status(400).json({"message": err.message});
  }
});

// test API for complete event
router.post("/complete", async (req, res) => {
  try {
    const payload = await CreateFormCompletedPayload(req.body);

    res.status(200).json(payload);
  } catch (err) {
    res.status(400).json({"message": err.message});
  }
});


/* GET Preview page. */
router.get("/preview", (req, res, next) => {
  res.redirect("preview/2");
});

router.get("/preview/:formId", (req, res, next) => {
  const formId = req.params.formId;
  if (formId > 3 || formId < 1) {
    return res.send("form id is invalid");
  }

  res.sendFile(path.resolve(`public/forms/preview/preview${formId}.html`));
});

router.get("/preview", (req, res, next) => {
  res.redirect("preview/1");
});

module.exports = router;
