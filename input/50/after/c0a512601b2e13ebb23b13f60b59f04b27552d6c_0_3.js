function (err) {
      console.log('Connection error.', err);
      next(new DbError('Connection failed.'));
    }