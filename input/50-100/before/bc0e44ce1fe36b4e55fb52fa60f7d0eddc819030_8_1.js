function(db) {
      // remove previous stores for now
      var existingNames = db.objectStoreNames;
      for (var i = 0; i < existingNames.length; i++) {
        db.deleteObjectStore(existingNames[i]);
      }

      // events -> belongs to calendar
      db.createObjectStore(store.events);

      // accounts -> has many calendars
      db.createObjectStore(store.accounts);

      // calendars -> has many events
      db.createObjectStore(store.calendars);
    }