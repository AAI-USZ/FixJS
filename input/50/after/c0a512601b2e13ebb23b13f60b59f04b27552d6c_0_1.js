function (err) {
        if (err) {
          next(new DbError('Authentication failed.'));
        }
      }