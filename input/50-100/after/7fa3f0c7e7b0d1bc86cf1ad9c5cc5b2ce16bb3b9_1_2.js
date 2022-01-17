function (req, res, next) {
  req.events = undefined;
  next();
}