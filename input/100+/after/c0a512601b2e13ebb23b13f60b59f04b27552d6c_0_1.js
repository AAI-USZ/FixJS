function (req, res, next) {
  var client = req.getDb();
  var selected = client.selected_db || 0;
  var new_select = parseInt(req.param('db'), 10);
  if (selected === new_select) {
    res.ok('You already have this database selected.');
  } else if (new_select >= 0 && new_select <= 15) {
    client.select(new_select, function (err) {
      if (err) {
        next(new DbError('Selecting the database failed: '+err));
      } else {
        res.ok({
          selected: new_select
        });
      }
    });
  } else {
    next(new DbError('Selected database must be from 0 to 15 (inclusive).'));
  }
}