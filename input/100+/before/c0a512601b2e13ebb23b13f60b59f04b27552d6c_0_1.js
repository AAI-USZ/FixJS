function (req, res, next) {
  res.ok({
    selected: req.getDb().selected_db || 0
  });
}