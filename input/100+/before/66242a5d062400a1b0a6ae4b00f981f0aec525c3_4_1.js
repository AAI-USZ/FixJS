function(db) {
      // remove previous stores for now
      var existingNames = db.objectStoreNames;
      for (var i = 0; i < existingNames.length; i++) {
        db.deleteObjectStore(existingNames[i]);
      }

      // events -> belongs to calendar
      var events = db.createObjectStore(store.events);

      events.createIndex(
        'calendarId',
        'calendarId',
        { unique: false, multientry: false }
      );

      // accounts -> has many calendars
      db.createObjectStore(store.accounts, { autoIncrement: true });

      // calendars -> has many events
      var calendar = db.createObjectStore(store.calendars);

      calendar.createIndex(
        'accountId',
        'accountId',
        { unique: false, multientry: false }
      );
    }