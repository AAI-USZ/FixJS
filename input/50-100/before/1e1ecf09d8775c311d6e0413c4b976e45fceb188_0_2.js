function (err, ids) {
      if (err) {
        throw new UserError('Database error: '+err, 500);
      } else if (ids.length > 0) {
        throw new UserError('Name taken.', 400);
      } else {
        res.ok();
      }
    }