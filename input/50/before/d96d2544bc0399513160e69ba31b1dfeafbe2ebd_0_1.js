function (err, data) {
        if (err) return next(err);
        if (typeof data == 'object' && data !== null) {
          memo.push(data);
        }
      }