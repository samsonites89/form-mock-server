module.exports = function(req, res, next) {
  const EMAIL_DOMAIN_WHITELIST = ["ujet.cx", "ujet.co"];
  const email = req.cookies["__session"];

  if (email === undefined) return res.redirect("/login");

  const address = email.split("@").pop();

  if (EMAIL_DOMAIN_WHITELIST.indexOf(address) >= 0) {
    return next();
  } else {
    return res.redirect("/login");
  }
};
