function(objects, sync, fn) { 
      if (sync) {
        objects.db = new lXapian.WritableDatabase('tmpdbs', lXapian.DB_CREATE_OR_OVERWRITE); 
        fn(null); 
      } else {
        new lXapian.WritableDatabase('tmpdbas', lXapian.DB_CREATE_OR_OVERWRITE, function(err, result) {
          objects.db = result;
          fn(err);
        });
      }
    }