function (req, res, next) {
  if (req.param('name')) {
    User.find({name: req.param('name')}, function (err, ids) {
      if (err) {
        next(new UserError('Database error: '+err, 500));
      } else if (ids.length > 0) {
        next(new UserError('Name taken.', 400));
      } else {
        res.ok();
      }
    });
  } else {
    next(new UserError('No name to check in parameters.'));
  }
}