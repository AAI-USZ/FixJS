function (err, rels) {
        if (!err && Array.isArray(endNode))
          return callback(err, _.flatten(rels));
        callback(err, rels);
      }