function (err, col) {
    if(typeof query._id === 'string') {
      if(fields) {
        col.findOne(query, fields, options, function (err, obj) {
          store.identify(query);
          fn(err, store.identify(obj));
        });
      } else {
        col.findOne(query, options, function (err, obj) {
          store.identify(query);
          fn(err, store.identify(obj));
        });
      }
    } else {
      if(fields) {
        col.find(query,  fields, options).toArray(function (err, arr) {
          fn(err, store.identify(arr));
        });
      } else {
        col.find(query, options).toArray(function (err, arr) {
          fn(err, store.identify(arr));
        });
      }

    }

  }