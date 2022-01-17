function(objects, sync, fn) { 
      if (sync) {
        objects.db = new xapian.WritableDatabase('tmpdbs', xapian.DB_CREATE_OR_OVERWRITE); 
        fn(null); 
      } else {
        new xapian.WritableDatabase('tmpdbas', xapian.DB_CREATE_OR_OVERWRITE, function(err, result) {
          objects.db = result;
          fn(err);
        });
      }
    }