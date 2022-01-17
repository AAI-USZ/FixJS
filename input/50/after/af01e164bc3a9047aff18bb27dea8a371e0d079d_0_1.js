function form2json(req, res, next) {
  if (!req.json) {
    var flat = req.body || req.query
    req.json = flat ? exports.transform(flat) : {}
  }
  next()
}