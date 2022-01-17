function (req, res, next) {
  var selected = req.getDb();
  if (!selected) {
    next(new DbError('Invalid database selected and default fallback does not exist.'));
  }
  res.ok({
    host: selected.host,
    port: selected.port,
    selected: selected.selected_db || 0,
    prefix: req.getPrefix()
  });
}